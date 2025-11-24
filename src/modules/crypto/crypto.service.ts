import * as crypto from 'crypto';

export class CryptoService {
  private readonly key: Buffer;
  private readonly algorithm = 'aes-256-gcm';

  constructor() {
    const base64Key = process.env.MASTER_KEY_BASE64;

    if (!base64Key) {
      throw new Error('MASTER_KEY_BASE64 não definida no .env');
    }

    this.key = Buffer.from(base64Key, 'base64');

  }

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    const ciphertext = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    const packed = Buffer.concat([iv, authTag, ciphertext]);

    return packed.toString('base64');
  }

decrypt(payloadBase64: string): string {
  const packed = Buffer.from(payloadBase64, 'base64');

  const iv = packed.subarray(0, 12);
  const authTag = packed.subarray(12, 12 + 16);
  const ciphertext = packed.subarray(12 + 16);

  const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

}
