// Header animatsiyasi
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

// Video modal
const video = document.querySelector('.video-player');
const modal = document.querySelector('.modal');
const modalVideo = document.querySelector('.modal-video');
const closeModal = document.querySelector('.close-modal');
const main = document.querySelector('.main');

video.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalVideo.play();
    main.classList.add('blur');
    document.querySelectorAll('.video-player').forEach(v => {
        if (v !== modalVideo) v.pause();
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.pause();
    main.classList.remove('blur');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause();
        main.classList.remove('blur');
    }
});

// See More/See Less
const seeMore = document.querySelector('.see-more');
const postContent = document.querySelector('.post-content');
seeMore.addEventListener('click', () => {
    if (postContent.style.display === 'none') {
        postContent.style.display = 'block';
        seeMore.textContent = 'See Less';
    } else {
        postContent.style.display = 'none';
        seeMore.textContent = 'See More';
    }
});

// Like va Sticker
const likeBtn = document.querySelector('.like-btn');
const stickerBtn = document.querySelector('.sticker-btn');
const likeCount = document.querySelector('.like-count');
const stickerCount = document.querySelector('.sticker-count');
let likes = {};
let stickers = {};

likeBtn.addEventListener('click', () => {
    const ip = getClientIp();
    if (!likes[ip]) {
        likes[ip] = true;
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
});

stickerBtn.addEventListener('click', () => {
    const ip = getClientIp();
    if (!stickers[ip]) {
        stickers[ip] = true;
        stickerCount.textContent = parseInt(stickerCount.textContent) + 1;
    }
});

// Double-tap like
video.addEventListener('dblclick', () => {
    const ip = getClientIp();
    if (!likes[ip]) {
        likes[ip] = true;
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
});

// Komment bo‘limi
const commentBtn = document.querySelector('.comment-btn');
const commentSection = document.querySelector('.comment-section');
let commentCount = {};

commentBtn.addEventListener('click', () => {
    commentSection.style.display = 'block';
    loadComments();
});

commentSection.addEventListener('scroll', () => {
    if (commentSection.scrollTop > 100) {
        commentSection.classList.add('fullscreen');
    } else {
        commentSection.classList.remove('fullscreen');
    }
});

// DDoS himoyasi: 1 IP-dan 50 ta komment
document.querySelector('#submit-comment').addEventListener('click', () => {
    const ip = getClientIp();
    commentCount[ip] = (commentCount[ip] || 0) + 1;
    if (commentCount[ip] <= 50) {
        const commentInput = document.querySelector('#comment-input');
        if (commentInput.value) {
            saveComment(commentInput.value);
            commentInput.value = '';
        }
    } else {
        alert('Siz 50 ta komment chegarasiga yetdingiz!');
    }
});
