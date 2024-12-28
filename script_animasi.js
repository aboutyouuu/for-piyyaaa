document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('not-loaded');
    
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
});