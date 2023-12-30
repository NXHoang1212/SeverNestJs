import * as QRCode from 'qrcode';

export const generateQrCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text);
  } catch (error: any) {
    console.log('🚀 ~ file: QrCode.ts:7 ~ generateQrCode ~ error:', error);
  }
};
