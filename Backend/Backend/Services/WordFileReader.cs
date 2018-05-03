using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class WordFileReader
    {
        private static WordFileReader _instance;

        public List<string> Words { get; }

        private WordFileReader()
        {
            Words = new List<string>();
        }

        public static WordFileReader Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new WordFileReader();
                    _instance.ReadFile();
                }

                return _instance;
            }
        }

        private void ReadFile()
        {
            using (Stream stream = Assembly.GetExecutingAssembly()
                .GetManifestResourceStream("Backend.Data.lower.lst"))
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    string line;
                    while ((line = reader.ReadLine()) != null)
                    {
                        Words.Add(line);
                    }
                }
            }
        }
    }
}
