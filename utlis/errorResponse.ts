export const HandleTitle = (statusCode: any) => {
    switch (statusCode) {
        case 500:
        case 502:
        case 503:
            return "Rumah Sedang Sibuk"
        case 403:
            return "Tidak Memiliki Akses"
        default:
            return "Tidak Ditemukan"
    }
}
