import { JetBrains_Mono, Fira_Code, Source_Code_Pro } from 'next/font/google';

// JetBrains Mono - closest to Cascadia Code and available on Google Fonts
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Fira Code - another popular coding font
const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Source Code Pro - clean monospace font
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

interface CodeFontProps {
  children: React.ReactNode;
  className?: string;
  font?: 'jetbrains' | 'fira' | 'source';
}

export default function CodeFont({ 
  children, 
  className = '', 
  font = 'jetbrains'
}: CodeFontProps) {
  let fontClass = '';
  
  switch (font) {
    case 'jetbrains':
      fontClass = jetBrainsMono.className;
      break;
    case 'fira':
      fontClass = firaCode.className;
      break;
    case 'source':
      fontClass = sourceCodePro.className;
      break;
    default:
      fontClass = jetBrainsMono.className;
  }
  
  return (
    <div className={`${fontClass} ${className}`}>
      {children}
    </div>
  );
}

// Export the font objects for use in layout or other components
export { jetBrainsMono, firaCode, sourceCodePro };
