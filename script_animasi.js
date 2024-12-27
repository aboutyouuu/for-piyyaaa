document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('not-loaded');
    
    const music = document.getElementById('bgMusic');
    const playButton = document.getElementById('playButton');
    let musicStarted = false;

    // Tambahkan overlay untuk interaksi awal
    const createStartOverlay = () => {
        const overlay = document.createElement('div');
        overlay.className = 'start-overlay';
        overlay.innerHTML = `
            <div class="start-content">
                <span>Klik untuk melanjutkan ✨</span>
            </div>
        `;
        document.body.appendChild(overlay);

        // Ketika overlay diklik
        overlay.addEventListener('click', function() {
            // Coba putar musik
            music.play().then(() => {
                musicStarted = true;
                playButton.innerHTML = '⏸️ Pause Music';
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
            }).catch(error => {
                console.error("Failed to play music:", error);
                overlay.remove();
            });
        });
    };

    // Tambahkan event listener untuk interaksi user
    document.addEventListener('click', function initAudio() {
        // Coba putar musik saat ada interaksi pertama
        music.play().then(() => {
            playButton.innerHTML = '⏸️ Pause Music';
        }).catch(error => {
            console.log("Playback failed:", error);
            playButton.innerHTML = '▶️ Play Music';
        });
        
        // Hapus listener setelah interaksi pertama
        document.removeEventListener('click', initAudio);
    }, { once: true });
    
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
            music.play().then(() => {
                playButton.innerHTML = '⏸️ Pause Music';
                musicStarted = true;
            });
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
        setTimeout(() => {
            targetSlide.classList.add('active');
        }, 10);
        
        prevBtn.style.display = slideNumber === 1 ? 'none' : 'block';
        nextBtn.style.display = slideNumber === slides.length ? 'none' : 'block';

        // Tampilkan overlay saat masuk slide 2
        if (slideNumber === 2 && !musicStarted) {
            createStartOverlay();
        }
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

    // Tambahkan event listener untuk memastikan audio sudah dimuat
    music.addEventListener('loadeddata', () => {
        console.log("Audio file loaded");
    });

    music.addEventListener('error', (e) => {
        console.error("Audio error:", e);
    });
});