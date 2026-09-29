import { execSync } from 'child_process';
import fs from 'fs';

console.log('==> Packaging WebNova Submission Project...');

const outputZip = 'WebNova_IEEE_CS_MBITS_Submission.zip';
if (fs.existsSync(outputZip)) {
  fs.unlinkSync(outputZip);
}

// Ensure production build passes
console.log('==> Running production build...');
execSync('npm run build', { stdio: 'inherit' });

console.log('==> Compressing source code (excluding node_modules and .git)...');
const psCommand = `Get-ChildItem -Path . -Exclude 'node_modules', '.git', '*.zip' | Compress-Archive -DestinationPath '${outputZip}' -Force`;

execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' });

const stats = fs.statSync(outputZip);
console.log(`\n SUCCESS: Package created successfully!`);
console.log(` File: ${outputZip}`);
console.log(` Size: ${(stats.size / 1024).toFixed(2)} KB`);
console.log(` Ready for Google Form Submission!`);
