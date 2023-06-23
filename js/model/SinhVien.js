function SinhVien(
    _maSV,
    _tenSV,
    _email,
    _matKhau,
    _ngaySinh,
    _khoaHoc,
    _diemToan,
    _diemLy,
    _diemHoa
) {
    ;(this.maSV = _maSV),
        (this.tenSV = _tenSV),
        (this.email = _email),
        (this.matKhau = _matKhau),
        (this.ngaySinh = _ngaySinh),
        (this.khoaHoc = _khoaHoc),
        (this.diemToan = _diemToan),
        (this.diemHoa = _diemHoa),
        (this.tinhTongLuong =function tinhTongLuong() {
          let tongLuong;
          if (this.diemToan === "Sếp") {
            tongLuong = this.khoaHoc * 3;
          } else if (this.diemToan === "Trưởng phòng") {
            tongLuong = this.khoaHoc * 2;
          } else if (this.diemToan === "Nhân viên") {
            tongLuong = this.khoaHoc;
          } else {
            tongLuong = 0;
          }
          ;
          return tongLuong;
        }
          ),
        (this.xepLoai = function xepLoai() {
            let xepLoai;
            if (this.diemHoa >= 192) {
              xepLoai = "Nhân viên xuất sắc";
            } else if (this.diemHoa >= 176) {
              xepLoai = "Nhân viên giỏi";
            } else if (this.diemHoa >= 160) {
              xepLoai = "Nhân viên khá";
            } else {
              xepLoai = "Nhân viên trung bình";
            }
            return xepLoai;
          }
          )
}

