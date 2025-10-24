class TerminalAnimation {
    constructor() {
        this.terminal = document.getElementById('terminal-content');
        this.cursor = document.getElementById('cursor');
        this.currentLine = null;
        this.isTyping = false;

        // Debug logging
        console.log('Terminal element:', this.terminal);
        console.log('Cursor element:', this.cursor);

        if (!this.terminal || !this.cursor) {
            console.error('Terminal or cursor element not found!');
            return;
        }
        this.sequence = [
            { text: 'Loading…', delay: 1000, class: 'success', slow: true },
            { text: 'Loading…', delay: 1000, class: 'success', slow: true },
            { text: 'Loading…', delay: 1000, class: 'success', slow: true },
            { text: 'System Startup Successful', delay: 1500, class: 'success', slow: true },
            { text: '', delay: 200 },
            { text: '[United States Department of Extranormal Phenomena: Site Delta: Biosciences Unit Archive- Terminal 005-a]', delay: 50, class: 'header' },
            { text: '[Date: 12/15/2005]', delay: 300, class: 'header' },
            { text: '', delay: 200 },
            { text: 'WARNING: YOU ARE ATTEMPTING TO ACCESS A TOP SECRET US GOVERNMENT COMPUTER DATABASE', delay: 10, class: 'warning' },
            { text: 'INTENDED TO BE SOLELY ACCESSED BY AUTHORIZED USERS ONLY.', delay: 10, class: 'warning' },
            { text: '', delay: 100 },
            { text: 'Usage MAY BE MONITORED, RECORDED, AND/OR SUBJECT TO AUDIT. UNAUTHORIZED USE OF THIS', delay: 10, class: 'warning' },
            { text: 'SYSTEM IS PROHIBITED. UNAUTHORIZED USERS WILL BE SUBJECT TO termination, immediate', delay: 10, class: 'warning' },
            { text: 'criminal prosecution in accordance with US code 18 subsection 1030 and all other', delay: 10, class: 'warning' },
            { text: 'applicable statutes', delay: 300, class: 'warning' },
            { text: '', delay: 200 },
            { text: 'c:\\>', delay: 200, class: 'prompt', action: 'login', instant: true },
        ];
        this.currentStep = 0;
        this.passwordAttempts = 0;
    }

    async start() {
        console.log('Starting animation...');
        if (!this.terminal || !this.cursor) {
            console.error('Cannot start - missing elements');
            return;
        }

        // Remove the cursor from its initial position and manage it separately
        this.cursor.remove();

        // Initialize first line
        this.newLine();

        await this.sleep(1000);
        this.runSequence();
    }

    async runSequence() {
        if (this.currentStep >= this.sequence.length) {
            return;
        }

        const step = this.sequence[this.currentStep];

        if (step.action === 'login') {
            await this.handleLogin();
        } else {
            if (step.instant) {
                await this.instantLine(step.text, step.class || '');
            } else if (step.slow) {
                await this.slowTypeLine(step.text, step.class || '');
            } else {
                await this.typeLine(step.text, step.class || '');
            }
            await this.sleep(step.delay || 100);
            this.currentStep++;
            this.runSequence();
        }
    }

    async handleLogin() {
        await this.typeCommand('C:\\>', 'login H_Sakamoto');
        this.newLine();
        await this.sleep(300);
        await this.typeLine('Submit credentials...', '');
        await this.sleep(200);
        await this.handlePasswordAttempts();
    }

    async handlePasswordAttempts() {
        const passwords = ['********', '******', '**********'];
        const attempts = ['Two out of three', 'One out of three'];

        for (let i = 0; i < 3; i++) {
            this.newLine();
            await this.instantText('Password:', '');
            await this.sleep(400); // Delay before user starts typing password
            await this.fastTypeText(passwords[i], 'password-field');
            await this.sleep(400);

            if (i < 2) {
                await this.typeLine(`Error: Password incorrect. ${attempts[i]} attempts remaining`, 'error');
                await this.sleep(400);
            } else {
                this.newLine();
                await this.typeLine('Authenticating. . . .', '');
                await this.sleep(200);
                await this.typeText('.........', '');
                await this.sleep(400);
                await this.typeLine('Please wait. . .', '');
                await this.sleep(200);
                await this.typeText('.........', '');
                await this.sleep(400);
                await this.typeLine('---------------------------------------------------------', '');
                await this.sleep(200);
                await this.typeLine('Credentials Verified. Zeta Level Access Granted. Welcome back, Dr. Hidiki Sakamoto.', 'success');
                await this.sleep(400);
                await this.typeLine('Last Login: Wed, Dec 2, 2005', '');
                await this.sleep(400);
                await this.handleFileSystem();
            }
        }
    }

    async handleFileSystem() {
        await this.sleep(300);
        await this.typeCommand('C:\\User\\H_Sakamoto>', 'cd Project_Ningyo');
        await this.sleep(200);
        await this.typeCommand('C:\\User\\H_Sakamoto\\Project_Ningyo>', 'dir');
        await this.sleep(300);
        await this.showFileTree();
    }

    async typeCommand(prompt, command) {
        this.newLine();
        await this.instantText(prompt, 'prompt');
        await this.sleep(500); // Delay before user starts typing
        await this.fastTypeText(command, '');
        await this.sleep(200);
    }

    async showFileTree() {
        const fileTreeLines = [
            '.',
            '└── PROJECT_NINGYO/',
            '    ├── DISCOVERY/',
            '    │   ├── FIRST_REPORTS.DOC',
            '    │   ├── ACQUISITION.DOC',
            '    │   └── STAFF_ASSIGNMENT_2005.DOC',
            '    ├── CONTAINMENT/',
            '    │   ├── INITIAL_EXAMINATIONS.DOC',
            '    │   ├── SPEC_PHEN_023_A-C.DOC',
            '    │   └── STAFF_ASSIGNMENTS.DOC',
            '    ├── EXPERIMENTATION/',
            '    │   ├── PHEN_0023_A_1.JPEG',
            '    │   ├── PHEN_0023_B.ZIP',
            '    │   ├── CHEMICAL_RESPONSE_TEST.DOC',
            '    │   ├── STIMULAI_RESPONSE_TEST.DOC',
            '    │   ├── SENSOR_ERR.LOG',
            '    │   ├── OVERNIGHT_OBSERVATION.WAV',
            '    │   ├── PERSONAL_NOTES(DELETE_THIS).TXT',
            '    │   └── BUDGET_ADJUSTMENT_REQUEST.DOC',
            '    ├── BLACKOUT/',
            '    │   ├── CAM_03.WAV',
            '    │   ├── SYS_ERR.LOG',
            '    │   └── IMSORRY.TXT',
            '    └── POST_BLACKOUT/',
            '        ├── INCIDENT_PHEN_0023_A.DOC',
            '        └── CASUALTY_REPORT.DOC'
        ];

        for (const line of fileTreeLines) {
            await this.instantLine(line, 'file-tree');
            await this.sleep(30);
        }

        await this.sleep(800);
        this.newLine();
        await this.instantText('C:\\User\\H_Sakamoto\\Project_Ningyo>', 'prompt');
        this.enableUserInput();
    }

    enableUserInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-field';
        input.placeholder = '';
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserCommand(input.value);
                input.remove();
                this.newLine();
            }
        });

        if (this.currentLine) {
            this.currentLine.appendChild(input);
            input.focus();
        }
    }

    handleUserCommand(command) {
        this.newLine();

        // Handle specific commands
        if (command.toLowerCase() === 'dir' || command.toLowerCase() === 'ls') {
            window.location.href = 'file-list.html';
            return;
        } else if (command.toLowerCase().includes('first_reports.doc')) {
            window.location.href = 'document.html?doc=first_reports';
            return;
        } else if (command.toLowerCase().includes('imsorry.txt')) {
            window.location.href = 'document.html?doc=imsorry';
            return;
        } else if (command.toLowerCase() === 'help') {
            this.instantText('Available commands: dir, ls, help, exit', '');
            this.newLine();
            this.instantText('Available files: FIRST_REPORTS.DOC, IMSORRY.TXT', '');
        } else if (command.toLowerCase() === 'exit') {
            this.instantText('Logging out...', '');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            return;
        } else {
            this.instantText(`Command not recognized: ${command}`, 'error');
        }

        this.newLine();
        this.instantText('C:\\User\\H_Sakamoto\\Project_Ningyo>', 'prompt');
        this.enableUserInput();
    }

    async typeLine(text, className = '') {
        this.newLine();
        await this.typeText(text, className);
    }

    async slowTypeLine(text, className = '') {
        this.newLine();
        await this.slowTypeText(text, className);
    }

    async instantLine(text, className = '') {
        this.newLine();
        await this.instantText(text, className);
    }

    async typeText(text, className = '') {
        this.isTyping = true;

        for (let i = 0; i < text.length; i++) {
            if (this.currentLine) {
                const span = document.createElement('span');
                if (className) span.className = className;
                span.textContent = text[i];
                this.currentLine.appendChild(span);
                await this.sleep(Math.random() * 15 + 5); // Faster typing speed for most text
            }
        }

        this.isTyping = false;
    }

    async fastTypeText(text, className = '') {
        this.isTyping = true;

        for (let i = 0; i < text.length; i++) {
            if (this.currentLine) {
                const span = document.createElement('span');
                if (className) span.className = className;
                span.textContent = text[i];
                this.currentLine.appendChild(span);
                await this.sleep(Math.random() * 2 + 1); // Very fast typing for inputs/commands
            }
        }

        this.isTyping = false;
    }

    async slowTypeText(text, className = '') {
        this.isTyping = true;

        for (let i = 0; i < text.length; i++) {
            if (this.currentLine) {
                const span = document.createElement('span');
                if (className) span.className = className;
                span.textContent = text[i];
                this.currentLine.appendChild(span);
                await this.sleep(Math.random() * 30 + 10); // Original slow typing speed
            }
        }

        this.isTyping = false;
    }

    async instantText(text, className = '') {
        if (this.currentLine && text) {
            const span = document.createElement('span');
            if (className) span.className = className;
            span.textContent = text;
            this.currentLine.appendChild(span);
        }
    }

    newLine() {
        const line = document.createElement('div');
        line.className = 'line';
        this.terminal.appendChild(line);
        this.currentLine = line;
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting terminal...');
    const terminal = new TerminalAnimation();
    terminal.start();
});

// Fallback in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Document still loading
} else {
    // Document already loaded
    console.log('Document already loaded, starting terminal...');
    const terminal = new TerminalAnimation();
    terminal.start();
}