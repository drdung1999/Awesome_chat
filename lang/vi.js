export const transValidator = {
  email_incorrect : "email phai co dang duongdung12a8@gmail.com",
  gender_incorrect : "ua tai sao gioi tinh lai sai ??",
  password_incorrect : "mat khau phai chua it nhat 8 ky tu bao gom chua hoa chu thuong va chu so",
  password_confirmation_incorrect : "nhap lai mat khau chua chinh xac",
};

export const transError = {
  account_in_use : "email này đã được sử  dụng",
  account_removed : "tài khoản này đã bị gỡ khỏi hệ thống nếu tin rằng điều này là hiểu nhầm vui lòng liên hệ lại với bộ phận kỹ thuật của chúng tôi !",
  account_not_active : "email đã được tạo nhưng chưa được acctive vui lòng kiểm tra email để  acctive tài khoản hoặc liên hệ với kỹ thuật viên của chúng tôi !",
  loginFalse: "sai tài khoản hoặc mật khẩu",
  server_error: "Có lỗi ở phía server, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi để báo cáo lỗi này xin cảm ơn"
};

export const transSuccess = {
  userCreated : (userEmail) =>{
    return 'tài khoản ' + userEmail + ' đã được tạo, vui lòng kiểm tra lại email của bạn để acctive tài khoản trước khi đăng nhập !, xin cảm ơn .'
  },
  account_actived : "kích hoạt tài khoản thành công",
  loginSuccess : (username) =>{
    return 'Xin chào ' + username + ' chúc bạn một ngày tốt lành'
  },
  logout_success: "Đăng xuất tài khoản thành công"
}

export const transmail = {
  subject: 'Real Live chat xác thực kích hoạt tài khoản',
  template : (linkVeryfy) =>{
    return '<h2>Bạn nhận được mail này vĩ đã đăng ký tài khoản trên Real Live Chat </h2> <h3>Vui lòng kích vào liên kết bên dưới để kích hoạt tài khoản</h3> </h3><a href="'+ linkVeryfy +'" target="blank">'+linkVeryfy+'</a></h3> <h4>Nếu email này là nhầm lẫn hãy bỏ qua nó</h4>'
  },
  send_fail: 'có lỗi trong quá trình gửi mail vui lòng liên hệ bộ phận hỗ trợ của chúng tôi'
}