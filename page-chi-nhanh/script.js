document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.querySelector('.nav-container');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });
    
    const dropdownItems = document.querySelectorAll('.menu li a i.fa-angle-down');
    
    dropdownItems.forEach(item => {
        const parent = item.parentElement.parentElement;
        
        parent.addEventListener('mouseenter', function() {
            this.classList.add('dropdown-active');
        });
        
        parent.addEventListener('mouseleave', function() {
            this.classList.remove('dropdown-active');
        });
    });
    
    const regionItems = document.querySelectorAll('.region-list li');
    const regionTitle = document.getElementById('region-title');
    const storeCards = document.querySelectorAll('.store-card');
    
   // danh sach cua hang
    const districtSelect = document.getElementById('district');
    const districtOptions = {
        hcm: ['quan1', 'quan3', 'quan7', 'thuduc', 'binhchanh', 'binhthanh', 'binhtan', 'govap', 'hocmon', 'phunhuan', 'quan10', 'quan11', 'quan4', 'quan5', 'quan6', 'tanbinh', 'tanphu'],
        hanoi: ['caugiay', 'hoankiem', 'dongda', 'badinh', 'tayho', 'bactuliem', 'gialam', 'hoangmai', 'hadong', 'longbien', 'haibatrung', 'thanhxuan'],
        haiphong: ['lechan', 'ngoquyen'],
        tayninh: ['tay_ninh_city'],
        nhatrang: ['nha_trang_city'],
        vungtau: ['vungtau_city'],
        dongnai: ['bien_hoa'],
        hungyen: ['vangiang'],
        binhduong: ['thu_dau_mot']
    };
    
    const districtNames = {
        'quan1': 'Quận 1',
        'quan3': 'Quận 3',
        'quan7': 'Quận 7',
        'thuduc': 'TP. Thủ Đức',
        'binhchanh': 'Bình Chánh',
        'binhthanh': 'Bình Thạnh',
        'binhtan': 'Bình Tân',
        'govap': 'Gò Vấp',
        'hocmon': 'Hóc Môn',
        'phunhuan': 'Phú Nhuận',
        'quan10': 'Quận 10',
        'quan11': 'Quận 11',
        'quan4': 'Quận 4',
        'quan5': 'Quận 5',
        'quan6': 'Quận 6',
        'tanbinh': 'Tân Bình',
        'tanphu': 'Tân Phú',
        'caugiay': 'Quận Cầu Giấy',
        'hoankiem': 'Quận Hoàn Kiếm',
        'dongda': 'Đống Đa',
        'badinh': 'Ba Đình',
        'tayho': 'Tây Hồ',
        'bactuliem': 'Bắc Từ Liêm',
        'gialam': 'Gia Lâm',
        'hoangmai': 'Hoàng Mai',
        'hadong': 'Hà Đông',
        'longbien': 'Long Biên',
        'haibatrung': 'Quận Hai Bà Trưng',
        'thanhxuan': 'Thanh Xuân',
        'ngoquyen': 'Ngô Quyền',
        'lechan': 'Lê Chân',
        'tay_ninh_city': 'TP. Tây Ninh',
        'nha_trang_city': 'TP. Nha Trang',
        'vungtau_city': 'TP. Vũng Tàu',
        'bien_hoa': 'Biên Hòa',
        'vangiang': 'Văn Giang',
        'thu_dau_mot': 'Thủ Dầu Một'
    };
    
   
    function showStores(region, district = null) {
        storeCards.forEach(card => {
            const cardRegion = card.getAttribute('data-region');
            const cardDistrict = card.getAttribute('data-district');
            const cardContainer = card.closest('.col-lg-5');
            
            if (cardRegion === region && (!district || cardDistrict === district)) {
                cardContainer.style.display = '';
            } else {
                cardContainer.style.display = 'none';
            }
        });
    }
    
    regionItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            regionItems.forEach(ri => ri.classList.remove('active'));
            
            this.classList.add('active');
            
            const region = this.getAttribute('data-region');
            const count = this.getAttribute('data-count');
            
            let regionName = this.querySelector('a').textContent.split('(')[0].trim();
            regionTitle.textContent = `Khám phá ${count} cửa hàng của chúng tôi ở ${regionName}`;
            //xu ly hien thi cua hang
            showStores(region);
            
            updateDistrictDropdown(region);
        });
    });
    
    function updateDistrictDropdown(region) {
        while (districtSelect.options.length > 1) {
            districtSelect.remove(1);
        }
        

        districtSelect.selectedIndex = 0;
        
        if (districtOptions[region]) {
            districtOptions[region].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = districtNames[district] || district;
                districtSelect.appendChild(option);
            });
        }
    }
    
    if (districtSelect) {
        districtSelect.addEventListener('change', function() {
            const selectedDistrict = this.value;
            const selectedRegion = document.querySelector('.region-list li.active').getAttribute('data-region');
            
            showStores(selectedRegion, selectedDistrict);
        });
    }
    
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const carouselInner = carousel.querySelector('.carousel-inner');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        
        function goToSlide(n) {
            if (n >= slideCount) n = 0;
            if (n < 0) n = slideCount - 1;
            
            currentSlide = n;
            

            carouselInner.style.transform = `translateX(-${20 * currentSlide}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }
        
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        goToSlide(0);
    });
    
    const supportButton = document.querySelector('.support-button button');
    
    if (supportButton) {
        supportButton.addEventListener('click', function() {
            const existingPopup = document.querySelector('.support-popup');

            if (existingPopup) {
                document.body.removeChild(existingPopup);
            } else {
                const popup = document.createElement('div');
                popup.className = 'support-popup';
                popup.innerHTML = `
                    <div class="support-popup-header">
                        <h4>Hỗ trợ khách hàng</h4>
                        <button class="close-popup">&times;</button>
                    </div>
                    <div class="support-popup-body">
                        <p>Vui lòng để lại thông tin liên hệ, chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                        <form id="support-form">
                            <input type="text" placeholder="Họ và tên" class="form-control mb-2" id="support-name">
                            <div class="error-message" id="name-error"></div>
                            <input type="email" placeholder="Email" class="form-control mb-2" id="support-email">
                            <div class="error-message" id="email-error"></div>
                            <input type="tel" placeholder="Số điện thoại" class="form-control mb-2" id="support-phone">
                            <div class="error-message" id="phone-error"></div>
                            <textarea placeholder="Nội dung cần hỗ trợ" class="form-control mb-2" rows="3" id="support-content"></textarea>
                            <div class="error-message" id="content-error"></div>
                            <button type="submit" class="btn btn-warning w-100" id="send-request-btn">Gửi yêu cầu</button>
                        </form>
                    </div>
                `;
                
                document.body.appendChild(popup);
                
                const style = document.createElement('style');
                style.textContent = `
                    .support-popup {
                        position: fixed;
                        bottom: 100px;
                        right: 30px;
                        width: 300px;
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                        z-index: 1000;
                        overflow: hidden;
                    }
                    .support-popup-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 15px;
                        background: #EA8025;
                        color: white;
                    }
                    .support-popup-header h4 {
                        margin: 0;
                        font-size: 16px;
                    }
                    .close-popup {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 20px;
                        cursor: pointer;
                    }
                    .support-popup-body {
                        padding: 15px;
                    }
                    .form-control {
                        width: 100%;
                        padding: 8px 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    }
                    .error-message {
                        color: red;
                        font-size: 0.8em;
                        margin-top: -8px;
                        margin-bottom: 10px;
                        display: none; /* Initially hidden */
                    }
                    .success-message {
                        color: green;
                        font-size: 0.9em;
                        margin-top: 10px;
                        text-align: center;
                    }
                `;
                document.head.appendChild(style);
                
                const closeBtn = popup.querySelector('.close-popup');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(popup);
                });

                const supportForm = popup.querySelector('#support-form');
                supportForm.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const nameInput = popup.querySelector('#support-name');
                    const emailInput = popup.querySelector('#support-email');
                    const phoneInput = popup.querySelector('#support-phone');
                    const contentInput = popup.querySelector('#support-content');

                    const nameError = popup.querySelector('#name-error');
                    const emailError = popup.querySelector('#email-error');
                    const phoneError = popup.querySelector('#phone-error');
                    const contentError = popup.querySelector('#content-error');

                    const name = nameInput.value.trim();
                    const email = emailInput.value.trim();
                    const phone = phoneInput.value.trim();
                    const content = contentInput.value.trim();

                    let isValid = true;

                    nameError.textContent = '';
                    emailError.textContent = '';
                    phoneError.textContent = '';
                    contentError.textContent = '';

                    nameError.style.display = 'none';
                    emailError.style.display = 'none';
                    phoneError.style.display = 'none';
                    contentError.style.display = 'none';

                    if (name === '') {
                        nameError.textContent = 'Vui lòng nhập Họ và tên.';
                        nameError.style.display = 'block';
                        isValid = false;
                    }

                    if (email === '') {
                        emailError.textContent = 'Vui lòng nhập Email.';
                        emailError.style.display = 'block';
                        isValid = false;
                    } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                        emailError.textContent = 'Vui lòng nhập địa chỉ Email hợp lệ.';
                        emailError.style.display = 'block';
                        isValid = false;
                    }

                    if (phone === '') {
                        phoneError.textContent = 'Vui lòng nhập Số điện thoại.';
                        phoneError.style.display = 'block';
                        isValid = false;
                    } else if (!/^(03|05|07|08|09)[0-9]{8}$/.test(phone)) {
                        phoneError.textContent = 'Số điện thoại chưa hợp lệ.';
                        phoneError.style.display = 'block';
                        isValid = false;
                    }

                    if (content === '') {
                        contentError.textContent = 'Vui lòng nhập Nội dung cần hỗ trợ.';
                        contentError.style.display = 'block';
                        isValid = false;
                    }

                    if (isValid) {
                        console.log('Form submitted successfully:');
                        console.log('Họ và tên:', name);
                        console.log('Email:', email);
                        console.log('Số điện thoại:', phone);
                        console.log('Nội dung cần hỗ trợ:', content);

                        const formData = `=== Thông tin hỗ trợ khách hàng ===
Thời gian: ${new Date().toLocaleString('vi-VN')}
Họ và tên: ${name}
Email: ${email}
Số điện thoại: ${phone}
Nội dung cần hỗ trợ: ${content}
===============================`;

                        const blob = new Blob([formData], { type: 'text/plain;charset=utf-8' });
                        
                        const downloadLink = document.createElement('a');
                        downloadLink.href = URL.createObjectURL(blob);
                        //tinh tu miliseconds (1/1/1970) (00:00:00 UTC) -> now
                        //milliseconds = (((năm * 365.25 + tháng * 30 + ngày) * 24 + giờ) * 60 + phút) * 60 * 1000 + giây * 1000
                        downloadLink.download = `phieu_ho_tro_khach_hang_${new Date().getTime()}.txt`;
                        
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);

                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.textContent = 'Yêu cầu của bạn đã được gửi đi.';
                        popup.querySelector('.support-popup-body').appendChild(successMessage);
                        supportForm.reset();
                        setTimeout(() => {
                            document.body.removeChild(popup);
                        }, 3000);
                    }
                });
            }
        });
        
        setInterval(() => {
            supportButton.classList.add('pulse');
            
            setTimeout(() => {
                supportButton.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // so cua hang o moi khu vuc
    if (regionItems.length > 0) {
        const defaultRegion = regionItems[0];
        defaultRegion.classList.add('active');
        const region = defaultRegion.getAttribute('data-region');
        const count = defaultRegion.getAttribute('data-count');
        let regionName = defaultRegion.querySelector('a').textContent.split('(')[0].trim();
        regionTitle.textContent = `Khám phá ${count} cửa hàng của chúng tôi ở ${regionName}`;
        updateDistrictDropdown(region);
        showStores(region);
    }
}); 