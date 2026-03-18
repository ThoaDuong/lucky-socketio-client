<template>
    <div class="rules_page relative min-h-screen w-full bg-gradient-to-br from-pink-200 via-pink-50 to-yellow-200">
        
        <!-- Shared Header -->
        <HeaderComponent />

        <!-- Main Content -->
        <main class="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
            
            <!-- Hero Section -->
            <section class="text-center mb-12 animate-section">
                <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 drop-shadow-sm mb-3">
                    Luật Chơi Lô Tô
                </h1>
                <p class="text-gray-600 text-base md:text-lg font-medium max-w-lg mx-auto leading-relaxed">
                    Trò chơi truyền thống không thể thiếu — cùng tìm hiểu cách chơi và trở thành người "kinh" đầu tiên!
                </p>
                <div class="mt-6 flex justify-center">
                    <span class="inline-block w-20 h-1 rounded-full bg-gradient-to-r from-pink-400 to-yellow-400"></span>
                </div>
            </section>

            <!-- Section: What is Lô Tô? -->
            <section class="mb-8 animate-section">
                <div class="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6 md:p-8 transition-transform duration-300 hover:scale-[1.01]">
                    <div class="flex items-center gap-3 mb-4">
                        <img class="w-9 h-9" src="https://img.icons8.com/3d-fluency/94/help.png" alt="question" />
                        <h2 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                            Lô tô là gì?
                        </h2>
                    </div>
                    <p class="text-gray-700 leading-relaxed">
                        Trò chơi lô tô được cho là có nguồn gốc từ trò chơi <strong>Bingo</strong> của phương Tây, xuất hiện vào thế kỷ 16. 
                        Những năm 1980 là thời kỳ hoàng kim của lô tô khi rất nhiều đoàn, gánh hát lô tô ra đời. 
                        Vào những dịp năm mới, các gánh lô tô hoạt động khá mạnh mẽ trên nhiều tỉnh thành.
                    </p>
                    <p class="text-gray-700 leading-relaxed mt-3">
                        Ngày nay, lô tô vẫn là trò chơi được yêu thích bởi tính giải trí cao, giúp người chơi thư giãn 
                        và tăng sự gắn kết tình cảm gia đình, bạn bè. Đây là gợi ý hoàn hảo để cùng vui chơi trong những ngày lễ!
                    </p>
                </div>
            </section>

            <!-- Section: Equipment -->
            <section class="mb-8 animate-section">
                <div class="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6 md:p-8 transition-transform duration-300 hover:scale-[1.01]">
                    <div class="flex items-center gap-3 mb-4">
                        <img class="w-9 h-9" src="https://img.icons8.com/3d-fluency/94/toolbox.png" alt="equipment" />
                        <h2 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                            Bộ trò chơi gồm những gì?
                        </h2>
                    </div>
                    <p class="text-gray-700 leading-relaxed mb-4">
                        Một bộ trò chơi lô tô truyền thống gồm có <strong>16 tấm vé</strong>, <strong>90 con cờ lô tô</strong> có chữ số kèm <strong>túi vải</strong> để đựng:
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <!-- Equipment Card: Ticket -->
                        <div class="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl p-4 border border-pink-100/50 text-center transition-transform duration-300 hover:scale-105">
                            <img class="w-12 h-12 mx-auto mb-2" src="https://img.icons8.com/3d-fluency/94/ticket.png" alt="ticket" />
                            <h3 class="font-bold text-gray-800 mb-1">Tấm Vé</h3>
                            <p class="text-gray-600 text-sm">Các tấm vé in chữ số phát cho người chơi</p>
                        </div>
                        <!-- Equipment Card: Token -->
                        <div class="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl p-4 border border-pink-100/50 text-center transition-transform duration-300 hover:scale-105">
                            <img class="w-12 h-12 mx-auto mb-2" src="https://img.icons8.com/3d-fluency/94/dice.png" alt="token" />
                            <h3 class="font-bold text-gray-800 mb-1">Con Cờ</h3>
                            <p class="text-gray-600 text-sm">Bằng gỗ hoặc nhựa, đánh số từ 1 đến 90</p>
                        </div>
                        <!-- Equipment Card: Bag -->
                        <div class="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl p-4 border border-pink-100/50 text-center transition-transform duration-300 hover:scale-105">
                            <img class="w-12 h-12 mx-auto mb-2" src="https://img.icons8.com/3d-fluency/94/gift.png" alt="bag" />
                            <h3 class="font-bold text-gray-800 mb-1">Túi Vải</h3>
                            <p class="text-gray-600 text-sm">Đựng các con cờ để người chơi không nhìn thấy</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section: How to Play -->
            <section class="mb-8 animate-section">
                <div class="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6 md:p-8 transition-transform duration-300 hover:scale-[1.01]">
                    <div class="flex items-center gap-3 mb-5">
                        <img class="w-9 h-9" src="https://img.icons8.com/3d-fluency/94/controller.png" alt="play" />
                        <h2 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                            Hướng dẫn cách chơi
                        </h2>
                    </div>
                    <ol class="space-y-4">
                        <li v-for="(step, index) in gameSteps" :key="index" class="flex gap-4 items-start">
                            <!-- Step number badge -->
                            <span class="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 text-white font-bold flex items-center justify-center text-sm shadow-md">
                                {{ index + 1 }}
                            </span>
                            <div>
                                <h3 class="font-bold text-gray-800">{{ step.title }}</h3>
                                <p class="text-gray-600 text-sm mt-1 leading-relaxed">{{ step.description }}</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </section>

            <!-- Section: Tips -->
            <section class="mb-8 animate-section">
                <div class="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6 md:p-8 transition-transform duration-300 hover:scale-[1.01]">
                    <div class="flex items-center gap-3 mb-4">
                        <img class="w-9 h-9" src="https://img.icons8.com/3d-fluency/94/fire--v2.png" alt="tips" />
                        <h2 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                            Mẹo chơi hay
                        </h2>
                    </div>
                    <ul class="space-y-3">
                        <li v-for="(tip, index) in tips" :key="index" class="flex gap-3 items-start">
                            <span class="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-yellow-400"></span>
                            <p class="text-gray-700 leading-relaxed">{{ tip }}</p>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Back to Login Button -->
            <section class="text-center animate-section">
                <router-link 
                    :to="{ name: 'login' }"
                    class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 shadow-[0_4px_14px_0_rgba(236,72,153,0.39)] text-white py-3 px-8 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 font-bold text-lg"
                >
                    <img class="w-6 h-6" src="https://img.icons8.com/matisse/100/controller.png" alt="play" />
                    <span>Vào Chơi Ngay</span>
                </router-link>
            </section>

        </main>

        <!-- Shared Footer -->
        <FooterComponent />
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted } from 'vue';
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import FooterComponent from '@/components/FooterComponent.vue';

    // Step-by-step instructions for the Lô Tô game
    const gameSteps = [
        {
            title: 'Chọn người làm "Cái"',
            description: 'Chọn một người làm "cái" — người có nhiệm vụ bốc cờ lô tô ngẫu nhiên và hô (công bố) số cho mọi người cùng dò.'
        },
        {
            title: 'Phát vé cho người chơi',
            description: 'Mỗi người chơi mua 1 hoặc nhiều tấm vé để dò số. Số lượng người chơi không giới hạn.'
        },
        {
            title: 'Bốc cờ & Dò số',
            description: 'Người làm "cái" bốc cờ và hô số. Người chơi dò số trên tấm vé — nếu trùng thì đánh dấu vào.'
        },
        {
            title: 'Hô "Kinh" để chiến thắng',
            description: 'Ai may mắn có đủ 5 con số trên tấm vé theo hàng ngang thì hô to "Kinh!" và trở thành người chiến thắng.'
        },
        {
            title: 'Kiểm tra & Trao thưởng',
            description: 'Người làm "cái" kiểm tra lại các số trên vé. Nếu đúng — người "kinh" giành chiến thắng. Nếu sai — ván tiếp tục và có thể bị phạt!'
        }
    ];

    // Helpful tips for playing Lô Tô
    const tips = [
        'Tập trung lắng nghe số được hô — tốc độ là chìa khóa chiến thắng!',
        'Nếu giữ nhiều vé, hãy sắp xếp chúng theo thứ tự dễ dò nhất.',
        'Dùng hạt nhựa hoặc sỏi để đánh dấu — tránh nhầm lẫn khi dò số.',
        'Chơi theo nhóm để tăng không khí vui vẻ và gắn kết tình cảm!',
        'Đừng quên kiểm tra kỹ trước khi hô "Kinh" — hô sai có thể bị phạt đấy!'
    ];

    let observer: IntersectionObserver | null = null;

    // Initialize IntersectionObserver for scroll-based section animations
    onMounted(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-section-visible');
                        observer?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        document.querySelectorAll('.animate-section').forEach((el) => {
            observer?.observe(el);
        });
    });

    // Clean up the observer when component unmounts
    onUnmounted(() => {
        observer?.disconnect();
    });
</script>

<style scoped>
/* Initial hidden state for scroll-animated sections */
.animate-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

/* Visible state triggered by IntersectionObserver */
.animate-section-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
