function DSSV() {
    this.arrSV = []

    this.themSV = function (sinhVien) {
        this.arrSV.push(sinhVien)
    }

    this.timSV = function (maSinhVien) {
        
        for (var i = 0; i < this.arrSV.length; i++) {
            var maSV = this.arrSV[i].maSV
            if (maSV === maSinhVien) {
                return i
            }
        }

        return -1
    }

    this.xoaSV = function (maSinhVien) {
     

        var index = this.timSV(maSinhVien)
        console.log('index: ', index)
        if (index !== -1) {
            this.arrSV.splice(index, 1)
        }
    
    }

    this.capNhatSV = function (sinhVien) {
        var index = this.timSV(sinhVien.maSV)
        if (index !== -1) {
            this.arrSV[index] = sinhVien
        }
    }
}

