import { reactive, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreData } from '@/stores/store';
import AgoraRTC, { IAgoraRTCClient, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

/**
 * Composable encapsulating all Agora WebRTC voice chat logic.
 */
export function useAgora() {
    const route = useRoute();
    const store = useStoreData();
    const appid = process.env.VUE_APP_AGORA_APPID || '';

    const agora = reactive({
        appid: appid,
        token: null,
        rtcUid: route.query.username ? route.query.username.toString() : '',
        room: route.query.room ? route.query.room.toString() : '',
        rtcClient: null as null | IAgoraRTCClient,
        audioTrack: {
            localAudioTrack: null as null | Promise<IMicrophoneAudioTrack>,
            remoteAudioTracks: {} as any,
        },
        micMuted: true,
        speakerMuted: false,
        isFirstTimeTurnMicro: true,
    });

    /**
     * Creates the Agora RTC client, joins the channel, and publishes the local mic track.
     */
    async function initRtc() {
        agora.rtcClient = markRaw(
            AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
        );

        agora.rtcClient.on('user-published', handleUserPublished);
        agora.rtcClient.on('user-left', handleUserLeft);

        await agora.rtcClient.join(
            agora.appid,
            agora.room,
            agora.token,
            agora.rtcUid
        );

        agora.audioTrack.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
        (await agora.audioTrack.localAudioTrack).setMuted(agora.micMuted);
        await agora.rtcClient.publish(await agora.audioTrack.localAudioTrack);
    }

    /**
     * Subscribes to a remote user's media stream and plays their audio.
     */
    async function handleUserPublished(user: any, mediaType: any) {
        await agora.rtcClient?.subscribe(user, mediaType);

        if (mediaType === 'audio') {
            agora.audioTrack.remoteAudioTracks[user.uid] = [user.audioTrack];
            user.audioTrack.play();
        }
    }

    /**
     * Removes the audio track of a user who left the RTC channel.
     */
    function handleUserLeft(user: any) {
        delete agora.audioTrack.remoteAudioTracks[user.uid];
    }

    /**
     * Toggles the user's microphone state (mute/unmute) and initializes WebRTC on first use.
     */
    async function handleToggleMicrophone() {
        agora.micMuted = !agora.micMuted;

        // init RTC at the first time
        if (agora.isFirstTimeTurnMicro && !agora.micMuted) {
            initRtc();
            agora.isFirstTimeTurnMicro = false;
        }
        // adjust muted
        else {
            (await agora.audioTrack.localAudioTrack)?.setMuted(agora.micMuted);
        }

        store.socketIO.emit('changeMicMuted', {
            username: route.query.username,
            room: route.query.room,
            micMuted: agora.micMuted,
        });
    }

    /**
     * Toggles the user's speaker state (mute/unmute).
     */
    async function handleToggleSpeaker() {
        agora.speakerMuted = !agora.speakerMuted;
        
        // In a real app, we might mute all remote audio tracks here.
        // For now, we just sync the UI status.
        Object.values(agora.audioTrack.remoteAudioTracks).forEach((tracks: any) => {
            tracks.forEach((track: any) => {
                track.setVolume(agora.speakerMuted ? 0 : 100);
            });
        });

        store.socketIO.emit('changeSpeakerMuted', {
            username: route.query.username,
            room: route.query.room,
            speakerMuted: agora.speakerMuted,
        });
    }

    /**
     * Disconnects from the Agora RTC channel and releases local audio resources.
     */
    async function leaveRtc() {
        (await agora.audioTrack.localAudioTrack)?.stop();
        (await agora.audioTrack.localAudioTrack)?.close();
        agora.rtcClient?.unpublish();
        agora.rtcClient?.leave();
    }

    return {
        agora,
        handleToggleMicrophone,
        handleToggleSpeaker,
        leaveRtc,
    };
}
