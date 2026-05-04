async function mulaiMisi() {
    const inputRaw = document.getElementById('deretAngka').value;
    const target = document.getElementById('targetAngka').value;
    const panggung = document.getElementById('panggung');
    const status = document.getElementById('status');
    const btnMulai = document.getElementById('btnMulai');
    const btnLanjut = document.getElementById('btnLanjut');

    if (!inputRaw || !target) return alert("Meow! Isi dulu kotak makanannya!");

    const deret = inputRaw.split(',').map(n => n.trim());
    panggung.innerHTML = '';
    
    // Siapkan kotak
    deret.forEach((angka, i) => {
        panggung.innerHTML += `<div class="kotak" id="box-${i}">${angka}</div>`;
    });

    // Sembunyikan tombol mulai, munculkan tombol lanjut
    btnMulai.classList.add('hidden');
    btnLanjut.classList.remove('hidden');

    for (let i = 0; i < deret.length; i++) {
        let kotakSekarang = document.getElementById(`box-${i}`);
        
        kotakSekarang.classList.add('endus');
        status.innerHTML = `🐱 *Endus endus*... Apakah kotak ke-${i+1} isinya <b>${target}</b>?`;

        // TUNGGU KLIK MOUSE pada tombol "Lanjut"
        await tungguKlikTombol('btnLanjut');

        if (deret[i] === target) {
            kotakSekarang.classList.remove('endus');
            kotakSekarang.classList.add('ketemu');
            status.innerHTML = `🐟 NYAM! Ketemu! Angka ${target} ada di kotak nomor ${i+1}. Mpuss kenyang!`;
            btnLanjut.classList.add('hidden');
            btnMulai.classList.remove('hidden');
            btnMulai.innerText = "Main Lagi? 🐾";
            return;
        } else {
            kotakSekarang.classList.remove('endus');
            kotakSekarang.classList.add('bukan');
            status.innerHTML = `😿 Bukan... Itu cuma angka ${deret[i]}. Lanjut cari lagi!`;
        }
    }

    status.innerHTML = "🙀 Yah, ikannya nggak ada di semua kotak!";
    btnLanjut.classList.add('hidden');
    btnMulai.classList.remove('hidden');
}

// Fungsi supaya program berhenti sampai tombol diklik
function tungguKlikTombol(idTombol) {
    return new Promise(resolve => {
        const tombol = document.getElementById(idTombol);
        const handler = () => {
            tombol.removeEventListener('click', handler);
            resolve();
        };
        tombol.addEventListener('click', handler);
    });
}