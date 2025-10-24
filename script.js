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
        await this.instantText('Use arrow keys to navigate, Enter to open file', 'prompt');
        this.newLine();
        this.enableFileNavigation();
    }

    enableFileNavigation() {
        // Define navigatable files
        this.navigatableFiles = [
            { name: 'FIRST_REPORTS.DOC', url: 'document.html?doc=first_reports', available: true },
            { name: 'ACQUISITION.DOC', url: null, available: false },
            { name: 'STAFF_ASSIGNMENT_2005.DOC', url: null, available: false },
            { name: 'INITIAL_EXAMINATIONS.DOC', url: null, available: false },
            { name: 'SPEC_PHEN_023_A-C.DOC', url: null, available: false },
            { name: 'STAFF_ASSIGNMENTS.DOC', url: null, available: false },
            { name: 'PHEN_0023_A_1.JPEG', url: null, available: false },
            { name: 'PHEN_0023_B.ZIP', url: null, available: false },
            { name: 'CHEMICAL_RESPONSE_TEST.DOC', url: null, available: false },
            { name: 'STIMULAI_RESPONSE_TEST.DOC', url: null, available: false },
            { name: 'SENSOR_ERR.LOG', url: null, available: false },
            { name: 'OVERNIGHT_OBSERVATION.WAV', url: null, available: false },
            { name: 'PERSONAL_NOTES(DELETE_THIS).TXT', url: null, available: false },
            { name: 'BUDGET_ADJUSTMENT_REQUEST.DOC', url: null, available: false },
            { name: 'CAM_03.WAV', url: null, available: false },
            { name: 'SYS_ERR.LOG', url: null, available: false },
            { name: 'IMSORRY.TXT', url: 'document.html?doc=imsorry', available: true },
            { name: 'INCIDENT_PHEN_0023_A.DOC', url: null, available: false },
            { name: 'CASUALTY_REPORT.DOC', url: null, available: false }
        ];

        this.currentFileIndex = 0;
        this.highlightCurrentFile();

        // Add keyboard event listener
        document.addEventListener('keydown', this.handleKeyNavigation.bind(this));
    }

    handleKeyNavigation(event) {
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (this.currentFileIndex > 0) {
                    this.currentFileIndex--;
                    this.highlightCurrentFile();
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (this.currentFileIndex < this.navigatableFiles.length - 1) {
                    this.currentFileIndex++;
                    this.highlightCurrentFile();
                }
                break;
            case 'Enter':
                event.preventDefault();
                this.openCurrentFile();
                break;
        }
    }

    highlightCurrentFile() {
        // Remove previous highlights
        const highlighted = document.querySelectorAll('.file-highlighted');
        highlighted.forEach(el => el.classList.remove('file-highlighted'));

        // Find and highlight current file
        const currentFile = this.navigatableFiles[this.currentFileIndex];
        const fileElements = document.querySelectorAll('.line');

        fileElements.forEach(line => {
            if (line.textContent.includes(currentFile.name)) {
                line.classList.add('file-highlighted');
                line.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Show file info
        this.showFileInfo(currentFile);
    }

    showFileInfo(file) {
        // Remove previous file info
        const existingInfo = document.querySelector('.file-info');
        if (existingInfo) existingInfo.remove();

        // Add file info
        const infoLine = document.createElement('div');
        infoLine.className = 'line file-info';

        let status = file.available ? '[AVAILABLE]' : '[RESTRICTED]';
        let statusClass = file.available ? 'success' : 'error';

        infoLine.innerHTML = `<span class="${statusClass}">${status}</span> ${file.name}`;
        this.terminal.appendChild(infoLine);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    openCurrentFile() {
        const currentFile = this.navigatableFiles[this.currentFileIndex];
        if (currentFile.available && currentFile.url) {
            window.location.href = currentFile.url;
        } else {
            // Show access denied message
            this.newLine();
            this.instantText('ACCESS DENIED - Insufficient clearance level', 'error');
        }
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