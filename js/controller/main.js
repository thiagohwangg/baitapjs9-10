function getElement(selector) {
    return document.querySelector(selector)
}

var dssv = new DSSV()

getLocalStorage()

function getThongTinSV(isEdit) {
    var maSV = getElement('#tknv').value
    var tenSV = getElement('#name').value
    var email = getElement('#email').value
    var matKhau = getElement('#password').value
    var ngaySinh = getElement('#datepicker').value
    var khoaHoc = getElement('#luongCB').value
    var diemToan = getElement('#chucvu').value
    var diemHoa = getElement('#gioLam').value



    var sinhVien = new SinhVien(
        maSV,
        tenSV,
        email,
        matKhau,
        ngaySinh,
        +khoaHoc,
        diemToan,
        +diemHoa
    )

    

    var isValid = true

    // Kiểm tra mã SV
    isValid &=
        kiemTraChuoi(
            sinhVien.maSV,
            1,
            undefined,
            '#tbTKNV',
            'Mã nhân viên không được bỏ trống'
        ) &&
        kiemTraChuoi(sinhVien.maSV, 4, 6, '#tbTKNV', 'Mã nhân viên từ 4 đến 6 ký tự') &&
        kiemTraMaSV(sinhVien.maSV, dssv.arrSV, isEdit, '#tbTKNV', 'Mã nhân viên đã tồn tại')

    // Kiểm tra tên sinh viên
    isValid &= kiemTraChuoi(
        sinhVien.tenSV,
        1,
        undefined,
        '#tbTen',
        'Tên nhân viên không được bỏ trống'
    )

    isValid &= kiemTraChuoi(sinhVien.email,1,undefined,'#tbEmail','Email không được bỏ trống') &&
    kiemTraPattern(
        sinhVien.email,
        '#tbEmail',
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không đúng định dạng'
    )

    

    isValid &= kiemTraChuoi(sinhVien.matKhau,1,undefined,'#tbMatKhau','Mật khẩu không được bỏ trống') &&
    kiemTraPattern(sinhVien.matKhau,'#tbMatKhau',/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,'Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)'
    )

    isValid &= kiemTraChuoi(sinhVien.ngaySinh,1,undefined,'#tbNgay','Ngày làm không được để trống') &&
    kiemTraPattern(sinhVien.ngaySinh,'#tbNgay',/^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/,'Định dạng mm/dd/yyyy'
    )

    // isValid &= kiemTraChuoi(khoaHoc,1,undefined,'#tbLuongCB','Lương không được để trống') && kiemTraSo(sinhVien.khoaHoc,1000000,20000000,'#tbLuongCB','Nhập từ 1.000.000 đến 20.000.000')

    //  isValid &= kiemTraChuoi(diemHoa,1,undefined,'#tbGiolam','Số giờ làm không được để trống') &&kiemTraSo(sinhVien.diemHoa,80,200,'#tbGioLam','Nhập số giờ làm từ 80h đến 200h')

    return isValid ? sinhVien : undefined
}

getElement('#btnThemNV').onclick = function () {
   

    var sinhVien = getThongTinSV(false)

    if (sinhVien) {
        
        dssv.themSV(sinhVien)
        console.log(dssv.arrSV)

       
        renderdssv()

       
        setLocalStorage()

    
    }
}

function renderdssv(arrSV = dssv.arrSV) {
    var content = ''
    for (var i = 0; i < arrSV.length; i++) {
        var sv = arrSV[i]
        
        content += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.diemToan}</td>
                <td>${sv.tinhTongLuong()}</td>
                <td>${sv.xepLoai()}</td>
                <td>
                    <button 
                        class='btn btn-success mr-3'
                        onclick="updateSV('${sv.maSV}')"
                    >
                        Edit
                    </button>
                    <button class='btn btn-danger' onclick="deleteSV('${sv.maSV}')">Delete</button>
                </td>
            </tr>
        `
    }

    // console.log('content', content)

    getElement('#tableDanhSach').innerHTML = content
}
// renderdssv()

// Lưu danh sách sinh viên vào localStorage
function setLocalStorage() {
    // B1: chuyển data về dạng string
    var data = JSON.stringify(dssv.arrSV)
    //B2: Lưu vào local
    localStorage.setItem('DSSV', data)

    // localStorage.setItem('DSSV',JSON.stringify(dssv.arrSV))
}

// get danh sách sinh viên từ localStorage
function getLocalStorage() {
    //B1: lấy data từ local
    var data = localStorage.getItem('DSSV') // null

    //B2: parse data về kiểu dữ liệu ban đầu
    if (data) {
        var parseData = JSON.parse(data)
        // console.log('parseData: ', parseData)

        // Tạo lại đối tượng sinhVien từ lớp đối SinhVien để lấy lại phương thức tinhDTB
        //B1: tạo mảng rỗng để lưu dssv
        var arr = []

        // B2: duyệt mảng đc lấy từ local
        for (var i = 0; i < parseData.length; i++) {
            var sv = parseData[i]
            console.log('sv: ', sv)
            // tạo lại đối tượng sv từ lớp đối tượng SV
            var sinhVien = new SinhVien(
                sv.maSV,
                sv.tenSV,
                sv.email,
                sv.matKhau,
                sv.ngaySinh,
                sv.khoaHoc,
                sv.diemToan,
                sv.diemHoa
            )
            // thêm sinhVien vào mảng arr
            arr.push(sinhVien)
        }

        // gán giá trị cho mảng arrSV từ data lấy từ localStorage
        dssv.arrSV = arr
        console.log('arr: ', arr)
        renderdssv()
    }
}

// xóa sinh viên
function deleteSV(maSV) {
    dssv.xoaSV(maSV)

    // Gọi lại hàm render để cập nhật lại UI sau khi xóa thành công
    renderdssv()

    // cập nhật lại data lưu dưới local storage
    setLocalStorage()
}

// cập nhật sinh viên
function updateSV(maSV) {
    // console.log('maSV: ', maSV)
    var index = dssv.timSV(maSV)
    // console.log('index: ', index)
    var sv = dssv.arrSV[index]
    console.log('sv: ', sv)

    // đẩy data lên input
    getElement('#tknv').value = sv.maSV
    getElement('#name').value = sv.tenSV
    getElement('#email').value = sv.email
    getElement('#password').value = sv.matKhau
    getElement('#datepicker').value = sv.ngaySinh
    getElement('#luongCB').value = sv.khoaHoc
    getElement('#chucvu').value = sv.diemToan
    getElement('#gioLam').value = sv.diemHoa
    
}

// Cập nhật lại sinh viên
getElement('#btnCapNhat').onclick = function () {
    // Lấy lại thông tin sinh viên sau khi chỉnh sửa xong
    var sinhVien = getThongTinSV(true)
    // cập nhật sinh viên
    dssv.capNhatSV(sinhVien)

    //  render lại UI
    renderdssv()

    // cập nhật data local
    setLocalStorage()

    // reset form
    getElement('#formQLNV').reset()
}

//Tìm kiếm sinh viên
getElement('#searchName').addEventListener('keyup', function(){
    var valueSearch =  getElement('#searchName').value.toLowerCase()
    // console.log('valueSerch: ', valueSearch);
    var arrSVSearch = []
    for(var i = 0; i < dssv.arrSV.length; i++){
        var tenSV = dssv.arrSV[i].tenSV.toLowerCase()
        if(tenSV.indexOf(valueSearch) !== -1){
            arrSVSearch.push(dssv.arrSV[i])
        }
    }
    console.log('arrSVSearch: ', arrSVSearch);
    renderdssv(arrSVSearch)
})


// -------------------------------------------------

// template string
var a = 'Nguyễn Văn B'
// var string = "Nguyễn Văn A" + a + "Nguyễn Văn C"
// string = "Nguyễn Văn A + a + Nguyễn Văn C"
// console.log('string: ', string);

// Local Storage
var sinhVien = {
    name: 'Nguyễn Văn C',
    age: 18,
    address: 'HCM',
    getInfo: function () {}, // ko lưu đc phương thức vào local storage
}
// Lưu
localStorage.setItem('SV1', JSON.stringify(sinhVien))

// read (lấy dữ liệu từ local storage)
var value = localStorage.getItem('SV')

// Chuyển dữ liệu lấy từ local về dạng ban đầu
// var parseValue = JSON.parse(value)

var parseValue = JSON.parse(localStorage.getItem('SV'))

// console.log('parseValue: ', parseValue)
// console.log('value: ', value)

// xóa dữ liệu local storage
localStorage.removeItem('SV1')

// truethy  falsy

// falsy
// fale
// 0
// '', "", ``
// undefined
// null
// NaN

// [], {}, function => true

// document.all

// var a = null
// var obj = {}
// if(obj){  // if(true)

// }

// if(!a) {

// }

// var arr = []
// var obj = {}

// var obj1 = {
//     // key: value
//     name: 'ABC',
//     gender: 'Nam',
//     address: 'HCM',
//     getInfo: function(){}
// }

// var arrKeyObj1 = Object.keys(obj1)
// console.log('arrKeyObj1: ', arrKeyObj1);
// for(var i =0; i< arrKeyObj1.length; i++){
//     const key = arrKeyObj1[i] // 'name'
//     console.log('obj1[key]',key, obj1['name']);
// }
// dynamic key

// Object.keys(obj1) => ['name', 'gender', 'address', 'getInfo']
// console.log(Object.keys(obj1))

// if (Object.keys(obj).length) {
// }

// var x = 'dsjfjhsak'

// var sum = true&&true&&true&&true
// var sum1 = true || false || false


// Default parameter
// function demo (number = 12345){
//     console.log(number);
// }

// demo(4723874239749)

