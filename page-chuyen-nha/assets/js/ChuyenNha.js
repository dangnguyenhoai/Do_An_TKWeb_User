
// Xử lí slider 
let currentSlide = 0
const slides = document.querySelectorAll('.slide')
const totalSlides = slides.length

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active')
    if (i === index) {
      slide.classList.add('active')
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1) % totalSlides
  showSlide(currentSlide)
}

// Chuyển slide mỗi 5 giây
setInterval(nextSlide, 5000)


// Xử lí tùy chọn nav
document.addEventListener('DOMContentLoaded', () => {
  const tagLinks = document.querySelectorAll('.page-tag li a')

  tagLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      tagLinks.forEach(l => l.classList.remove('active'))
      this.classList.add('active')
    })
  })
})

// Xử lí nút lên đầu trang
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  // Hiện nút khi cuộn xuống
  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block"
    } else {
      scrollBtn.style.display = "none"
    }
  });

  // Cuộn lên đầu khi ấn nút
  scrollBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })
})

window.addEventListener('scroll', function() {
    var navContainer = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
        navContainer.classList.add('scrolled');
    } else {
        navContainer.classList.remove('scrolled');
    }
});






