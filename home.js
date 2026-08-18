let mediaData = { image: "", video: "" };

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    let imgInput = document.getElementById("postImage");
    let videoInput = document.getElementById("postVideo");

    if (imgInput) {
        imgInput.onchange = function () {
            let file = this.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    mediaData.image = e.target.result;
                    document.getElementById("imagePreview").src = mediaData.image;
                    document.getElementById("imagePreview").style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        };
    }

    if (videoInput) {
        videoInput.onchange = function () {
            let file = this.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    mediaData.video = e.target.result;
                    document.getElementById("videoPreview").src = mediaData.video;
                    document.getElementById("videoPreview").style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        };
    }

    loadPosts();
});

// دالة إضافة رمز للمصطلحات المقدسة
function replaceHolyNames(text) {
    text = text.replace(/خودي/gi, "𒀭 خودي");
    text = text.replace(/خودى/gi, "𒀭 خودى");
    text = text.replace(/طاووس ملك/gi, "𒀭 طاووس ملك");
    text = text.replace(/تاوسي ملك/gi, "𒀭 تاوسي ملك");
    text = text.replace(/شيخادي/gi, "𒀭 شيخادي");
    text = text.replace(/لالش/gi, "𒀭 لالش");
    return text;
}

function addNewPost() {
    let textInput = document.getElementById("postInput");
    let text = textInput.value.trim();

    if (!text && !mediaData.image && !mediaData.video) {
        alert("الرجاء إدخال نص أو ميديا للنشر");
        return;
    }

    text = replaceHolyNames(text);

    let newPost = {
        id: Date.now(),
        author: localStorage.getItem("fullname") || "مستخدم",
        avatar: localStorage.getItem("userAvatar") || "https://via.placeholder.com/40",
        text: text,
        image: mediaData.image,
        video: mediaData.video,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    textInput.value = "";
    mediaData = { image: "", video: "" };
    document.getElementById("imagePreview").style.display = "none";
    document.getElementById("videoPreview").style.display = "none";

    loadPosts();
}

function loadPosts() {
    let feed = document.getElementById("feedContainer");
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    if (posts.length === 0) {
        feed.innerHTML = `<p style="text-align:center; color:#888;">لا توجد منشورات حتى الآن</p>`;
        return;
    }

    let postsHTML = "";
    posts.forEach(post => {
        postsHTML += `
            <div style="background:#fff; border-radius:10px; padding:15px; margin-bottom:15px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px; position:relative;">
                    <img src="${post.avatar}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
                    <div>
                        <strong style="display:block; font-size:14px;">${post.author}</strong>
                        <span style="font-size:11px; color:#777;">${post.time}</span>
                    </div>
                    <button onclick="deletePost(${post.id})" style="position:absolute; left:0; top:0; width:auto; background:#ffebee; color:#d32f2f; padding:2px 8px; font-size:12px;">حذف</button>
                </div>
                ${post.text ? `<p style="margin-bottom:10px; line-height:1.4;">${post.text}</p>` : ""}
                ${post.image ? `<img src="${post.image}" style="width:100%; border-radius:8px; margin-bottom:5px;">` : ""}
                ${post.video ? `<video controls src="${post.video}" style="width:100%; border-radius:8px; margin-bottom:5px;"></video>` : ""}
            </div>
        `;
    });

    feed.innerHTML = postsHTML;
}

function deletePost(id) {
    if (confirm("هل تريد حذف المنشور؟")) {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}
