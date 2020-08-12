import io from '@utils/io';

export default {
  sendErrorMsg(data: any) {
    return io.post('/errorMsg', {
      data
    });
  }
};
