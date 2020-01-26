import {check} from 'express-validator/check';
import {transValidator} from '../../lang/vi.js';

let updateInfor = [
  check("username",transValidator.update_username)
    .optional()
    .isLength({min:3,max : 17})
    .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
  check("gender",transValidator.update_gender)
    .optional()
    .isIn([ "male", "female"]),
  check("address",transValidator.update_address)
    .optional()
    .isLength({min:3,max :30}),
  check("phone",transValidator.update_phone)
    .optional()
    .matches(/^(0)[0-9]{9,10}$/)
];

module.exports = {
  updateInfor : updateInfor
}