using System;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using WebThienDo.Models;

namespace WebThienDo.Business
{
    public class SessionBusiness
    {
        private readonly AppDBContext _appDbContext;
        public SessionBusiness(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Boolean Logout(string token)
        {
            return false;
        }

        public Boolean CheckLogin(string token)
        {
            return _appDbContext.Sessions.FirstOrDefault(x => x.Token.Equals(token) && x.ExpiredDate < DateTime.Now) != null;
        }

        public string CreateToken(string username)
        {
            DateTime createDateTime = DateTime.Now;
            string tokenInput = "username:" + username + "&&createDateTime:" + createDateTime.Ticks;
            string token = EncryptMD5(tokenInput);
            _appDbContext.Sessions.Add(new Session { Token = token, ExpiredDate = createDateTime.AddDays(1), Username = username });
            var firstOrDefault = _appDbContext.Accounts.FirstOrDefault(x => x.Username == username);
            if (firstOrDefault != null)
                firstOrDefault.LastLogin = createDateTime;
            _appDbContext.SaveChanges();
            return token;
        }

        private static string EncryptMD5(string input)
        {
            // Use input string to calculate MD5 hash
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                foreach (byte t in hashBytes)
                {
                    sb.Append(t.ToString("X2"));
                }
                return sb.ToString();
            }
        }

        private static string DecryptMD5(string cipherString)
        {
            //get the byte code of the string
            byte[] toEncryptArray = Convert.FromBase64String(cipherString);

            AppSettingsReader settingsReader =
                                                new AppSettingsReader();
            //Get your key from config file to open the lock!
            string key = (string)settingsReader.GetValue("SecurityKey",
                                                         typeof(String));
            //if hashing was used get the hash code with regards to your key
            MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
            var keyArray = hashmd5.ComputeHash(Encoding.UTF8.GetBytes(key));
            //release any resource held by the MD5CryptoServiceProvider

            hashmd5.Clear();

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider
            {
                Key = keyArray,
                Mode = CipherMode.ECB,
                Padding = PaddingMode.PKCS7
            };
            //set the secret key for the tripleDES algorithm
            //mode of operation. there are other 4 modes. 
            //We choose ECB(Electronic code Book)

            //padding mode(if any extra byte added)

            ICryptoTransform cTransform = tdes.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(
                                 toEncryptArray, 0, toEncryptArray.Length);
            //Release resources held by TripleDes Encryptor                
            tdes.Clear();
            //return the Clear decrypted TEXT
            return Encoding.UTF8.GetString(resultArray);
        }
    }
}