
const pages = [
    "Article-TayBac.html",
    "Article-Signature.html",
    "Article-TrungThu.html"
]

// Lấy tên file hiện tại
const currentPage = location.pathname.split("/").pop()
const currentIndex = pages.indexOf(currentPage)

function nextbtn() {
    const nextIndex = (currentIndex + 1) % pages.length
    location.href = pages[nextIndex]
}

function prevbtn() {
    const prevIndex = (currentIndex - 1 + pages.length) % pages.length
    location.href = pages[prevIndex]
}

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
