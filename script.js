const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");
const btnClear = document.querySelector(".btn-clear");
const plainText = document.getElementById("plainText");
const encryptedText = document.getElementById("encryptedText");
const keySelect = document.getElementById("keySelect");
const toggleDarkMode = document.querySelector(".toggle-dark-mode");

// Fungsi untuk menghasilkan daftar konsonan secara dinamis
function generateConsonantOptions() {
	const consonants = [];
	const vowels = ["a", "e", "i", "o", "u"];
	for (let i = 97; i <= 122; i++) {
		// Loop untuk huruf a-z
		const letter = String.fromCharCode(i);
		if (!vowels.includes(letter)) {
			// Jika bukan vokal, tambahkan ke array konsonan
			consonants.push(letter);
		}
	}
	// Menambahkan opsi ke dalam select
	consonants.forEach((consonant) => {
		const option = document.createElement("option");
		option.value = consonant;
		option.textContent = consonant;
		keySelect.appendChild(option);
	});
}

// Fungsi untuk mengenkripsi teks
function encryptText(text, key) {
	return text
		.split(/([aeiou])/gi)
		.map((v) => (["a", "i", "u", "e", "o"].includes(v) ? `${v}${key}${v}` : v))
		.join("");
}

// Fungsi untuk mendekripsi teks
function decryptText(text, key) {
	const regex = new RegExp(`([aeiou])${key}\\1`, "gi");
	return text.replace(regex, "$1");
}

// Fungsi untuk menyimpan status mode gelap di localStorage
function setDarkModeStatus(status) {
	localStorage.setItem("dark-mode", status);
}

// Fungsi untuk mengaktifkan atau menonaktifkan mode gelap
function toggleDarkModeFunc() {
	document.body.classList.toggle("dark-mode");
	const darkModeActive = document.body.classList.contains("dark-mode");
	setDarkModeStatus(darkModeActive ? "enabled" : "disabled");
	toggleDarkMode.textContent = darkModeActive ? "Light mode" : "Dark mode";
}

// Fungsi untuk menginisialisasi mode gelap dari localStorage
function initializeDarkMode() {
	const darkModeStatus = localStorage.getItem("dark-mode");
	if (darkModeStatus === "enabled") {
		document.body.classList.add("dark-mode");
		toggleDarkMode.textContent = "Light mode";
	} else {
		document.body.classList.remove("dark-mode");
		toggleDarkMode.textContent = "Dark mode";
	}
}

// Event listener untuk tombol Encrypt
btnEncrypt.addEventListener("click", function () {
	const key = keySelect.value; // Ambil key yang dipilih dari select
	const encrypted = encryptText(plainText.value, key);
	encryptedText.value = encrypted;
});

// Event listener untuk tombol Decrypt
btnDecrypt.addEventListener("click", function () {
	const key = keySelect.value; // Ambil key yang dipilih dari select
	const decrypted = decryptText(encryptedText.value, key);
	encryptedText.value = decrypted;
});

// Event listener untuk tombol Clear
btnClear.addEventListener("click", function () {
	plainText.value = "";
	encryptedText.value = "";
});

// Event listener untuk Dark Mode
toggleDarkMode.addEventListener("click", toggleDarkModeFunc);

// Panggil fungsi inisialisasi dark mode saat halaman dimuat
initializeDarkMode();

// Panggil fungsi untuk menghasilkan daftar konsonan saat halaman dimuat
generateConsonantOptions();
