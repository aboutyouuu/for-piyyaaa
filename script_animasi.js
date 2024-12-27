document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('not-loaded');
    
    const music = document.getElementById('bgMusic');
    const playButton = document.getElementById('playButton');
    let musicStarted = false;

    // Fungsi untuk mencoba memutar musik
    async function tryPlayMusic() {
        try {
            await music.play();
            musicStarted = true;
            playButton.innerHTML = '⏸️ Pause Music';
            console.log("Music started successfully");
        } catch (error) {
            console.error("Autoplay failed:", error);
            // Tambahkan one-time click listener untuk seluruh dokumen
            const startMusic = async () => {
                try {
                    await music.play();
                    musicStarted = true;
                    playButton.innerHTML = '⏸️ Pause Music';
                } catch (e) {
                    console.error("Play on click failed:", e);
                }
            };
            document.addEventListener('click', startMusic, { once: true });
        }
    }

    // Update audio tag di animasi.html
    music.setAttribute('preload', 'auto');
    
    // Mencegah akses langsung ke audio
    music.addEventListener('contextmenu', e => e.preventDefault());
    music.addEventListener('dragstart', e => e.preventDefault());
    
    // Mencegah download dan inspect
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && 
            (e.key === 's' || 
             e.key === 'S' || 
             e.key === 'u' || 
             e.key === 'U' || 
             e.key === 'i' || 
             e.key === 'I')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Mencegah klik kanan
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    playButton.addEventListener('click', function() {
        if (music.paused) {
            tryPlayMusic();
        } else {
            music.pause();
            playButton.innerHTML = '▶️ Play Music';
        }
    });

    // Tambahkan hover effect untuk tombol
    playButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.3)';
    });

    playButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });

    // Tambahkan kode untuk navigasi slide
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 1;
    
    function showSlide(slideNumber) {
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
        targetSlide.style.display = 'block';
        
        // Tunggu animasi slide muncul selesai baru putar musik
        setTimeout(() => {
            targetSlide.classList.add('active');
            
            // Putar musik hanya ketika masuk ke slide 2 dan musik belum dimulai
            if (slideNumber === 2 && !musicStarted) {
                // Tambahkan delay kecil untuk memastikan transisi slide selesai
                setTimeout(() => {
                    tryPlayMusic();
                }, 500); // Delay 500ms setelah slide muncul
            }
        }, 10);
        
        prevBtn.style.display = slideNumber === 1 ? 'none' : 'block';
        nextBtn.style.display = slideNumber === slides.length ? 'none' : 'block';
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 1) {
            currentSlide--;
            showSlide(currentSlide);
            
            // Jika kembali dari slide 2, pause musik
            if (currentSlide === 1 && !music.paused) {
                music.pause();
                playButton.innerHTML = '▶️ Play Music';
            }
        }
    });
    
    // Show first slide initially
    showSlide(1);

    // Fungsi untuk membuat kunang-kunang
    function createFireflies(count) {
        const container = document.querySelector('.fireflies');
        
        for (let i = 0; i < count; i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            
            // Random position dan durasi
            const duration = 10 + Math.random() * 15;
            const xStart = Math.random() * window.innerWidth;
            const yStart = Math.random() * window.innerHeight;
            const xEnd = Math.random() * window.innerWidth;
            const yEnd = Math.random() * window.innerHeight;
            
            firefly.style.setProperty('--duration', `${duration}s`);
            firefly.style.setProperty('--x-start', `${xStart}px`);
            firefly.style.setProperty('--y-start', `${yStart}px`);
            firefly.style.setProperty('--x-end', `${xEnd}px`);
            firefly.style.setProperty('--y-end', `${yEnd}px`);
            
            container.appendChild(firefly);
            
            // Setelah animasi selesai, buat posisi baru
            firefly.addEventListener('animationend', () => {
                const newXStart = Math.random() * window.innerWidth;
                const newYStart = Math.random() * window.innerHeight;
                const newXEnd = Math.random() * window.innerWidth;
                const newYEnd = Math.random() * window.innerHeight;
                
                firefly.style.setProperty('--x-start', `${newXStart}px`);
                firefly.style.setProperty('--y-start', `${newYStart}px`);
                firefly.style.setProperty('--x-end', `${newXEnd}px`);
                firefly.style.setProperty('--y-end', `${newYEnd}px`);
            });
        }
    }

    // Buat 20 kunang-kunang
    createFireflies(20);

    // Pastikan audio sudah dimuat
    music.addEventListener('loadeddata', () => {
        console.log("Audio file loaded successfully");
    });

    music.addEventListener('error', (e) => {
        console.error("Audio loading error:", e);
        // Coba load source alternatif jika yang pertama gagal
        if (music.getElementsByTagName('source')[0].src !== music.getElementsByTagName('source')[1].src) {
            music.src = music.getElementsByTagName('source')[1].src;
        }
    });
});