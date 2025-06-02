// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6sAqPKwQ5pVG3LwTMm9jt8YLlHzclhx8",
  authDomain: "sample-firebase-ai-app-878ce.firebaseapp.com",
  databaseURL: "https://sample-firebase-ai-app-878ce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sample-firebase-ai-app-878ce",
  storageBucket: "sample-firebase-ai-app-878ce.firebasestorage.app",
  messagingSenderId: "727395823990",
  appId: "1:727395823990:web:02e9855bfc78f48ca44a57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Kommentlarni saqlash
function saveComment(comment, parentId = null) {
    const ip = getClientIp(); // IP manzilni olish
    const commentRef = parentId 
        ? database.ref(`comments/${parentId}/replies`).push() 
        : database.ref('comments').push();
    commentRef.set({
        text: comment,
        timestamp: Date.now(),
        ip: ip
    });
}

// Kommentlarni real vaqtda olish
function loadComments() {
    const commentsList = document.querySelector('.comments-list');
    database.ref('comments').on('value', (snapshot) => {
        commentsList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const comment = childSnapshot.val();
            const commentId = childSnapshot.key;
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p>${comment.text}</p>
                <span class="reply-btn">Reply</span>
                <span class="show-replies">Show Replies (${countReplies(childSnapshot)})</span>
                <div class="replies"></div>
            `;
            commentsList.appendChild(commentDiv);

            // Replylar
            database.ref(`comments/${commentId}/replies`).on('value', (replySnapshot) => {
                const repliesDiv = commentDiv.querySelector('.replies');
                repliesDiv.innerHTML = '';
                replySnapshot.forEach((replyChild) => {
                    const reply = replyChild.val();
                    const replyDiv = document.createElement('div');
                    replyDiv.textContent = reply.text;
                    repliesDiv.appendChild(replyDiv);
                });
            });

            // Reply tugmasi
            commentDiv.querySelector('.reply-btn').addEventListener('click', () => {
                const replyInput = document.createElement('input');
                replyInput.placeholder = 'Add a reply...';
                const submitReply = document.createElement('button');
                submitReply.textContent = 'Post';
                commentDiv.appendChild(replyInput);
                commentDiv.appendChild(submitReply);
                submitReply.addEventListener('click', () => {
                    if (replyInput.value) {
                        saveComment(replyInput.value, commentId);
                        replyInput.remove();
                        submitReply.remove();
                    }
                });
            });

            // Show Replies tugmasi
            commentDiv.querySelector('.show-replies').addEventListener('click', () => {
                const repliesDiv = commentDiv.querySelector('.replies');
                repliesDiv.classList.toggle('show');
            });
        });
    });
}

// Replylar sonini hisoblash
function countReplies(snapshot) {
    return snapshot.child('replies').numChildren();
}

// IP manzilni olish (server tomonida amalga oshiriladi)
function getClientIp() {
    return 'IP_ADDRESS'; // Haqiqiy ilovada server orqali olinadi
}
