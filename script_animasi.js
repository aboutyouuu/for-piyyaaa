document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('not-loaded');
    
    const music = document.getElementById('bgMusic');
    const playButton = document.getElementById('playButton');
    let musicStarted = false;

    // Fungsi untuk mencoba memutar musik
    async function tryPlayMusic() {
        try {
            const music = document.getElementById('bgMusic');
            if (!music) {
                console.error("Audio element not found");
                return;
            }

            // Reset dan cek status audio
            music.currentTime = 0;
            
            // Cek apakah file audio tersedia
            if (music.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
                console.warn("No audio source available, trying to reload");
                music.load();
                
                // Coba source alternatif jika ada
                const sources = music.getElementsByTagName('source');
                if (sources.length > 1 && sources[0].src !== sources[1].src) {
                    music.src = sources[1].src;
                }
            }
            
            await music.play();
            musicStarted = true;
            const playButton = document.getElementById('playButton');
            if (playButton) {
                playButton.innerHTML = '⏸️ Pause Music';
            }
            console.log("Music started successfully");
        } catch (error) {
            console.error("Music playback failed:", error);
            handlePlaybackError();
        }
    }

    // Fungsi untuk menangani error pemutaran
    function handlePlaybackError() {
        const playButton = document.getElementById('playButton');
        if (!playButton) return;

        // Update UI untuk menunjukkan error
        playButton.innerHTML = '❌ Music Error';
        
        // Tambahkan one-time click listener untuk mencoba lagi
        const retryPlayback = async () => {
            playButton.innerHTML = '🔄 Retrying...';
            try {
                await tryPlayMusic();
            } catch (e) {
                console.error("Retry failed:", e);
                playButton.innerHTML = '❌ Music Error';
            }
        };

        playButton.addEventListener('click', retryPlayback, { once: true });
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
    
    if (!slides.length || !prevBtn || !nextBtn) {
        console.error("Required elements not found");
        return;
    }

    let currentSlide = 1;
    
    function showSlide(slideNumber) {
        try {
            slides.forEach(slide => {
                if (slide) {
                    slide.style.display = 'none';
                    slide.classList.remove('active');
                }
            });
            
            const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
            if (!targetSlide) {
                console.error(`Slide ${slideNumber} not found`);
                return;
            }

            targetSlide.style.display = 'block';
            
            setTimeout(() => {
                targetSlide.classList.add('active');
                
                if (slideNumber === 2 && !musicStarted) {
                    setTimeout(tryPlayMusic, 500);
                }
            }, 10);
            
            if (prevBtn) prevBtn.style.display = slideNumber === 1 ? 'none' : 'block';
            if (nextBtn) nextBtn.style.display = slideNumber === slides.length ? 'none' : 'block';
        } catch (error) {
            console.error("Error showing slide:", error);
        }
    }

    // Event listeners dengan error handling
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < slides.length) {
                currentSlide++;
                showSlide(currentSlide);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 1) {
                currentSlide--;
                showSlide(currentSlide);
                
                const music = document.getElementById('bgMusic');
                if (currentSlide === 1 && music && !music.paused) {
                    music.pause();
                    const playButton = document.getElementById('playButton');
                    if (playButton) {
                        playButton.innerHTML = '▶️ Play Music';
                    }
                }
            }
        });
    }

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