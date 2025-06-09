document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo carousel tự động
  const mainCarousel = document.querySelector('#mainCarousel');
  if (mainCarousel) {
    new bootstrap.Carousel(mainCarousel, {
      interval: 5000,
      ride: 'carousel'
    });
  }

  // Smooth scrolling cho các liên kết nội trang
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Hiệu ứng khi cuộn trang
  const animateOnScroll = () => {
    document.querySelectorAll('.hover-effect, .category-item, .product-card').forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.8) el.classList.add('animated');
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // chạy lần đầu
});

// chat box
// Chat Box Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatBoxToggle = document.getElementById('chat-box-toggle');
    const chatBoxClose = document.getElementById('chat-box-close');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Toggle chat box
    chatBoxToggle.addEventListener('click', function() {
        chatBox.classList.toggle('show');
    });
    
    // Close chat box
    chatBoxClose.addEventListener('click', function() {
        chatBox.classList.remove('show');
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message sent';
            userMessage.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate reply after 1 second
            setTimeout(() => {
                const replyMessage = document.createElement('div');
                replyMessage.className = 'message received';
                replyMessage.innerHTML = '<p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!</p>';
                chatMessages.appendChild(replyMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    // Send on button click
    chatSend.addEventListener('click', sendMessage);
    
    // Send on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

window.addEventListener('scroll', function() {
    var navContainer = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
        navContainer.classList.add('scrolled');
    } else {
        navContainer.classList.remove('scrolled');
    }
});