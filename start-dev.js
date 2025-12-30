import { spawn } from 'child_process';

const child = spawn('npm', ['run', 'dev'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true
});

// Auto-respond to prompts by sending Enter key
const autoRespond = setInterval(() => {
  try {
    child.stdin.write('\n');
  } catch (e) {
    // Process might have ended
  }
}, 500);

child.on('exit', (code) => {
  clearInterval(autoRespond);
  process.exit(code);
});

process.on('SIGINT', () => {
  clearInterval(autoRespond);
  child.kill('SIGINT');
});
