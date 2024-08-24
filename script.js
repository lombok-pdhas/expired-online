document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const tanggal = document.getElementById("tanggal").value;
    const nomor = parseInt(document.getElementById("nomor").value, 10);
    const tanggalSekarang = new Date();
    const tanggalDalamMilidetik = new Date(tanggal).getTime();
    const tanggalSekarangDalamMilidetik = tanggalSekarang.getTime();
    const selisihHari = Math.abs(
      (tanggalSekarangDalamMilidetik - tanggalDalamMilidetik) /
        (1000 * 60 * 60 * 24)
    );

    //fungsi menghitung melebihi masa retur
    const selisihHariMelebihiRetur = Math.round(selisihHari - nomor);
    // Cek apakah produk sudah expired
    if (selisihHari <= nomor) {
      Swal.fire({
        icon: "warning",
        title: "Melebihi Masa Retur",
        text: `Produk ini telah Melebihi Masa Retur ${selisihHariMelebihiRetur} Hari`,
      });
    } else {
      // Cek apakah produk melewati masa retur (expired)
      const batasReturDalamMilidetik =
        tanggalDalamMilidetik - nomor * 24 * 60 * 60 * 1000;
      const selisihHariSebelumExpired = Math.abs(
        (tanggalSekarangDalamMilidetik - batasReturDalamMilidetik) /
          (1000 * 60 * 60 * 24)
      );

      //fungsi menghitung expired sudah berapa hari
      const selisihHariExpired = Math.round(
        (tanggalDalamMilidetik - tanggalSekarangDalamMilidetik) /
          (1000 * 60 * 60 * 24)
      );
      if (tanggalSekarangDalamMilidetik > batasReturDalamMilidetik) {
        Swal.fire({
          icon: "error",
          title: "Produk Expired",
          text: `Produk Sudah Expired ${selisihHariExpired} Hari`,
        });
      } else {
        // Bulatkan jumlah hari ke angka bulat terdekat
        const hariBulat = Math.round(selisihHariSebelumExpired);
        Swal.fire({
          icon: "success",
          title: "Silahkan Return",
          text: `Produk ini masih bisa di-return, Akan Mendekati Masa Retur Dalam: ${hariBulat} hari.`,
        });
      }
    }
  });
});
