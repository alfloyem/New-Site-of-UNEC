document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".show-password").forEach(button => {
        button.addEventListener("click", function () {
            const input = this.previousElementSibling;
            const hideIcon = this.nextElementSibling;
            
            if (input && input.type === "password") {
                input.type = "text";
                input.placeholder = "Şifrenizi yazın";
                this.style.display = "none";
                if (hideIcon) hideIcon.style.display = "block";
            }
        });
    });
    
    document.querySelectorAll(".hide-password").forEach(button => {
        button.addEventListener("click", function () {
            const input = this.previousElementSibling.previousElementSibling;
            const showIcon = this.previousElementSibling;
            
            if (input && input.type === "text") {
                input.type = "password";
                input.placeholder = "••••••••";
                this.style.display = "none";
                if (showIcon) showIcon.style.display = "block";
            }
        });
    });
});