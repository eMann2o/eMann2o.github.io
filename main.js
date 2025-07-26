// Terminal functionality
const terminalInput = document.getElementById('terminalInput');
const terminalBody = document.getElementById('terminalBody');
const matrixCanvas = document.getElementById('matrixCanvas');

// Command history and state
let commandHistory = [];
let historyIndex = -1;
let matrixActive = false;
let particleSystem = null;

// Available commands
const commands = {
    system_init: () => `🚀 Welcome to Emmanuel Opoku's Interactive Portfolio Terminal!

System Status: ✅ All systems operational
Terminal Version: 2.0.0
Last Updated: ${new Date().toLocaleDateString()}

Quick Start:
• Type 'help' to see all available commands
• Try 'about', 'projects', 'skills', or 'contact'
• Use Tab for auto-completion
• Arrow keys navigate command history
• 'clear' resets the terminal

Easter Eggs: Hidden throughout - explore and discover! 🥚
Pro Tip: Try the Konami Code for a surprise! 🎮

Ready for commands...`,

    help: () => `Available commands:
• help - Show help message
• whoami - Get info about me
• about - Learn more about me
• projects - View my latest work
• resume - Download my resume
• contact - Get in touch
• social - Find me online
• ls_la_skills - See my skillset
• clear - Clear terminal
• joke - Tell a programming joke
• skills - Show technical skills
• fortune - Get a developer fortune
• history - Show command history`,

    ls_skills: () =>'PHP • MySQL • PDO • AJAX • JavaScript • HTML • CSS • SQL • Python • Pandas • NumPy • Matplotlib • Excel • Power BI • Statistics • Probability',

    whoami: () => `Developer with 3+ years of experience crafting digital solutions
• help - Show help message
• whoami - Get info about me
• about - Learn more about me
• projects - View my latest work
• resume - Download my resume
• contact - Get in touch
• social - Find me online
• clear - Clear terminal
• joke - Tell a programming joke
• skills - Show technical skills
• fortune - Get a developer fortune
• history - Show command history`,

    about: () => {
        showSection('about-section');
        return 'Loading about section... Emmanuel Opoku is a passionate full-stack developer with expertise in modern web technologies.';
    },

    projects: () => {
        showSection('projects-section');
        return 'Loading projects... Showcasing innovative web applications and creative solutions.';
    },

    contact: () => {
        showSection('contact-section');
        return 'Loading contact form... Ready to connect and collaborate on exciting projects!';
    },

    resume: () => {
        // Simulate file download
        setTimeout(() => {
            addTerminalLine('download', 'Resume.pdf downloaded successfully! 📄');
        }, 1500);
        return 'Initiating resume download... Please wait.';
    },

    social: () => `Find me across the web:
• GitHub: https://github.com/eMann2o - Code repositories & open source
• LinkedIn: www.linkedin.com/in/emmanuel-opoku-a45820198 - Professional network
• Twitter: @emman2o - Tech thoughts & updates
• Email: papa16annan@gmail.com.com - Let's collaborate!
• Instagram: @the_e.m.a.n.n,
• TikTok: @emann2.o`,

    clear: () => {
        setTimeout(() => {
            terminalBody.innerHTML = `
                <div class="terminal-input">
                    <span class="prompt">eMann@portfolio:~$</span>
                    <input type="text" id="terminalInput" placeholder="Type a command...">
                    <span class="cursor"></span>
                </div>
            `;
            setupTerminalInput();
        }, 100);
        return 'Terminal cleared. Fresh start! ✨';
    },

    joke: () => {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem. 💡",
            "Why do Java developers wear glasses? Because they can't C#! 👓",
            "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
            "Why don't programmers like nature? It has too many bugs. 🌿",
            "There are only 10 types of people: those who understand binary and those who don't. 1️⃣0️⃣",
            "Programming is 90% debugging and 10% writing bugs. 🐞",
            "I would tell you a UDP joke, but you might not get it. 📡",
            "Why did the programmer quit his job? He didn't get arrays! 📊",
            "How do you comfort a JavaScript bug? You console it! 🎮"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    },

    skills: () => {
        showSection('skills-section');
        return `Technical Skills Overview:

• Git, GitHub Actions - Version control & CI/CD

Backend Web Development:
• PHP, Laravel - Traditional web development
• HTML5, CSS3, SASS - Semantic markup & styling

Database Management:
• MySQL - Relational databases

Data Management & Analytics:
• Python - Data Analysis`;
    },

    fortune: () => {
        const fortunes = [
            "You will write bug-free code today. (Results may vary) 🐛✨",
            "A merge conflict approaches. Prepare your git fu. ⚔️",
            "Today is a good day to refactor that legacy code. 🔧",
            "The semicolon you're looking for is in another file. 🔍",
            "Your code will compile on the first try... eventually. ⏰",
            "A senior developer will appreciate your clean code. 👨‍💻💯",
            "Stack Overflow will have the exact answer you need. 📚",
            "Your app will handle edge cases gracefully today. 🎯",
            "Documentation will be written willingly. (Miracle alert!) 📝✨",
            "The production deployment will go smoothly. 🚀"
        ];
        
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        const luckyNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * 100));
        
        return `🔮 Developer Fortune Cookie:

"${fortune}"

Lucky numbers: ${luckyNumbers.join(', ')}
Lucky color: #${Math.floor(Math.random()*16777215).toString(16)}
Lucky framework: ${['React', 'Vue', 'Laravel', 'Svelte'][Math.floor(Math.random() * 4)]}`;
    },

    history: () => {
        if (commandHistory.length === 0) return 'No command history available. Start typing some commands!';
        return `Command History (last ${Math.min(commandHistory.length, 10)}):
${commandHistory.slice(0, 10).map((cmd, i) => `  ${(i + 1).toString().padStart(2)} ${cmd}`).join('\n')}

Tip: Use arrow keys to navigate through history!`;
    }
};

// Easter eggs and hidden commands
const easterEggs = {
    'sudo rm -rf /': () => '🚫 Nice try! Access denied. Your system is safe from accidental destruction.',
    'hack the planet': () => '🌍 HACK THE PLANET! *cue 90s techno music* 🎵',
    'hack': () => '👨‍💻 Hacking in progress... Just kidding! Ethical coding only here. 🛡️',
    'konami': () => '🎮 ↑ ↑ ↓ ↓ ← → ← → B A START! You know the code! 🕹️',
    'secret': () => '🤫 You found a secret! Here\'s a virtual cookie: 🍪 (Zero calories!)',
    'exit': () => '🚪 There is no escape from the terminal! Welcome to the Matrix... forever! 😈',
    'vim': () => '⚠️ Vim disabled for your safety. Use VS Code like the rest of us! 😄 (Just kidding, vim lovers!)',
    'emacs': () => '🤝 Editor wars are so last decade! Use whatever makes you productive! ✌️',
    'sudo': () => '🔐 Nice try! You\'re not in the sudoers file. This incident will be reported. (To /dev/null)',
    'rm -rf node_modules': () => '💀 The most dangerous command known to JavaScript developers! *nervous laughter*',
    'npm install': () => '📦 Installing the entire internet... Please wait while we download 500MB of dependencies.',
    'yarn': () => '🧶 Yarn? We prefer npm here, but to each their own package manager!',
    'docker run': () => '🐳 Docker container spinning up... Just kidding, this is a browser, not a whale!',
    'kubernetes': () => '⚓ k8s is great, but this portfolio runs on much simpler infrastructure!',
    'blockchain': () => '⛓️ Sorry, this portfolio is not on the blockchain. Too mainstream! 😉',
    'ai': () => '🤖 AI is the future, but good old-fashioned coding skills are still essential!',
    '42': () => '🌌 The Answer to the Ultimate Question of Life, the Universe, and Everything!',
    'hello world': () => '👋 Hello, World! The first program that started it all. Welcome to coding!',
    'stack overflow': () => '📚 Stack Overflow: Where questions are asked and egos are destroyed. But hey, we all learn!',
    'github': () => '🐱 GitHub: Where code lives, dreams are shared, and merge conflicts happen!',
    'css is awesome': () => '🎨 CSS IS AWESOME [    AWESOME] - Every web developer\'s favorite meme!',
    'javascript': () => '📜 JavaScript: The language that powers the web and confuses developers daily!',
    'python': () => '🐍 Python: The language that makes you feel smart until you forget the indentation.',
    'coffee++': () => '☕ Incrementing coffee levels... Developer productivity increased by 127%!',
    'sleep': () => '😴 Sleep is for those who don\'t have one more bug to fix... Just one more...',
    'debugging': () => '🔍 99% of debugging is fixing the bug you created while fixing the previous bug.',
    ping: (host = 'google.com') => {
        if (!host) host = 'google.com';

        // Simulate ping times
        const times = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100) + 10);

        let output = `Pinging ${host} with 32 bytes of data:\n`;
        times.forEach(time => {
            output += `Reply from ${host}: bytes=32 time=${time}ms TTL=128\n`;
        });

        const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);

        output += `\nPing statistics for ${host}:
        Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
    Approximate round trip times in milli-seconds:
        Minimum = ${Math.min(...times)}ms, Maximum = ${Math.max(...times)}ms, Average = ${avg}ms`;

        return output;
    },

    'matrix': () => {toggleMatrix(); return 'Matrix rain activated! Type "matrix" again to toggle off.';
},

};

// Command aliases for convenience
const aliases = {
    'h': 'help',
    'c': 'clear',
    'cls': 'clear',
    '?': 'help'
};

function processCommand(input) {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');
    
    // Check aliases first
    if (aliases[command]) {
        return processCommand(aliases[command] + (args ? ' ' + args : ''));
    }
    
    // Handle commands with arguments
    if (command === 'echo') {
        return args || '';
    }
    
    // Check easter eggs
    const fullCommand = input.trim().toLowerCase();
    if (easterEggs[fullCommand]) {
        return easterEggs[fullCommand]();
    }
    
    // Check regular commands
    if (commands[command]) {
        return commands[command](args);
    }
    
    // Command not found with intelligent suggestions
    const suggestion = suggestCommands(command);
    let response = `Command not found: ${input}`;
    
    if (suggestion) {
        response += `\n💡 ${suggestion}`;
    } else {
        response += '\n💡 Type "help" for available commands!';
    }
    
    return response;
}

function suggestCommands(input) {
    const allCommands = [...Object.keys(commands), ...Object.keys(easterEggs), ...Object.keys(aliases)];
    
    // Find exact partial matches
    const partialMatches = allCommands.filter(cmd => 
        cmd.toLowerCase().includes(input.toLowerCase()) && cmd !== input.toLowerCase()
    );
    
    // Find commands with similar starting letters
    const similarCommands = allCommands.filter(cmd => 
        cmd.toLowerCase().startsWith(input.toLowerCase().charAt(0)) && 
        !partialMatches.includes(cmd)
    );
    
    if (partialMatches.length > 0) {
        return `Did you mean: ${partialMatches.slice(0, 3).join(', ')}?`;
    } else if (similarCommands.length > 0 && input.length > 1) {
        return `Similar commands: ${similarCommands.slice(0, 3).join(', ')}`;
    }
    
    return null;
}

function addTerminalLine(command, output, isError = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = 'eMann@portfolio:~$ ';
    
    const commandSpan = document.createElement('span');
    commandSpan.className = 'command';
    commandSpan.textContent = command;
    
    line.appendChild(promptSpan);
    line.appendChild(commandSpan);
    
    const outputDiv = document.createElement('div');
    outputDiv.className = isError ? 'output error' : 'output';
    
    // Handle multiline output with proper formatting
    const formattedOutput = output.replace(/\n/g, '<br>');
    outputDiv.innerHTML = formattedOutput;
    
    const inputElement = terminalBody.querySelector('.terminal-input');
    terminalBody.insertBefore(line, inputElement);
    terminalBody.insertBefore(outputDiv, inputElement);
    
    // Smooth scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
    
    // Add typing animation for longer outputs
    if (output.length > 100) {
        outputDiv.style.opacity = '0';
        setTimeout(() => {
            outputDiv.style.transition = 'opacity 0.3s ease';
            outputDiv.style.opacity = '1';
        }, 50);
    }
}

function setupTerminalInput() {
    const input = document.getElementById('terminalInput');
    if (!input) return;
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value;
            if (command.trim()) {
                // Add to history (avoid duplicates)
                if (commandHistory[0] !== command) {
                    commandHistory.unshift(command);
                    // Keep history reasonable size
                    if (commandHistory.length > 50) {
                        commandHistory = commandHistory.slice(0, 50);
                    }
                }
                historyIndex = -1;
                
                const output = processCommand(command);
                addTerminalLine(command, output);
                input.value = '';
                
                // Add subtle input feedback
                input.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    input.style.transform = 'scale(1)';
                }, 100);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
                // Move cursor to end
                setTimeout(() => {
                    input.setSelectionRange(input.value.length, input.value.length);
                }, 0);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
                setTimeout(() => {
                    input.setSelectionRange(input.value.length, input.value.length);
                }, 0);
            } else if (historyIndex === 0) {
                historyIndex = -1;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const currentValue = input.value.toLowerCase().trim();
            if (currentValue) {
                const allCommands = [...Object.keys(commands), ...Object.keys(easterEggs), ...Object.keys(aliases)];
                const matchingCommands = allCommands.filter(cmd => 
                    cmd.startsWith(currentValue)
                );
                
                if (matchingCommands.length === 1) {
                    input.value = matchingCommands[0];
                } else if (matchingCommands.length > 1) {
                    // Show available completions
                    addTerminalLine(
                        input.value,
                        `Available completions: ${matchingCommands.slice(0, 8).join(', ')}${matchingCommands.length > 8 ? '...' : ''}`
                    );
                    // Complete to common prefix
                    const commonPrefix = getCommonPrefix(matchingCommands);
                    if (commonPrefix.length > currentValue.length) {
                        input.value = commonPrefix;
                    }
                }
            }
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            commands.clear();
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            input.value = '';
            addTerminalLine('^C', 'Command interrupted');
        }
    });
    
    // Click anywhere in terminal to focus input
    terminalBody.addEventListener('click', (e) => {
        if (e.target !== input) {
            input.focus();
        }
    });
    
    // Auto-focus input
    //input.focus();
    
    // Add input animation
    // input.addEventListener('focus', () => {
    //     input.style.borderColor = 'var(--accent-green)';
    //     input.style.boxShadow = '0 0 10px rgba(57, 255, 20, 0.3)';
    // });
    
    input.addEventListener('blur', () => {
        input.style.borderColor = 'transparent';
        input.style.boxShadow = 'none';
    });
}

function getCommonPrefix(strings) {
    if (strings.length === 0) return '';
    
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
        while (strings[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === '') return '';
        }
    }
    return prefix;
}

function showSection(sectionId) {
    // Hide all sections with animation
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });
    
    // Show requested section with animation
    const section = document.getElementById(sectionId);
    if (section) {
        setTimeout(() => {
            section.classList.add('active');
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    }
}

// Matrix rain effect
function initMatrix() {
    if (!matrixCanvas) return;
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()+-/~{[|`]}アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 10;
    const columns = matrixCanvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        if (!matrixActive) return;
        
        ctx.fillStyle = 'rgba(13, 17, 23, 0.04)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#39ff14';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

function toggleMatrix() {
    if (!matrixCanvas) return;
    
    matrixCanvas.classList.toggle('active');
    matrixActive = !matrixActive;
    
    if (matrixActive) {
        matrixCanvas.style.opacity = '0';
        setTimeout(() => {
            matrixCanvas.style.transition = 'opacity 1s ease';
            matrixCanvas.style.opacity = '0.1';
        }, 100);
    } else {
        matrixCanvas.style.opacity = '0';
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced project card interactions
function setupProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            // Add click effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
            }, 150);
            
            // Simulate project details loading
            const projectTitle = card.querySelector('.project-title')?.textContent || 'Unknown Project';
            addTerminalLine(
                `open project "${projectTitle}"`,
                `Loading ${projectTitle}... Opening in new tab 🚀`
            );
        });
        
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 10px 30px rgba(57, 255, 20, 0.3)';
            card.style.borderColor = 'var(--accent-cyan)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
            card.style.borderColor = 'var(--border-color)';
        });
    });
}

// Enhanced contact form handling
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validate form data
        if (!name || !email || !message) {
            addTerminalLine(
                'contact --error',
                '❌ Please fill in all required fields.',
                true
            );
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            addTerminalLine(
                'contact --email-invalid',
                '❌ Please enter a valid email address.',
                true
            );
            return;
        }
        
        // Show processing animation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending delay
        setTimeout(() => {
            addTerminalLine(
                `contact --name="${name}" --email="${email}"`,
                `✅ Message sent successfully! I'll get back to you soon, ${name}! 📧
                
Message preview:
"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"

Expected response time: 24-48 hours ⏰`,
                false
            );
            
            // Reset form
            this.reset();
            
            // Show success animation
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'var(--accent-green)';
            submitBtn.style.color = 'var(--bg-primary)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'transparent';
                submitBtn.style.color = 'var(--accent-green)';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
    
    // Real-time form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    if (!value && field.required) {
        showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        return false;
    }
    
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff6b6b';
    field.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
    
    let errorDiv = field.parentNode.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.8em';
        errorDiv.style.marginTop = '5px';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = 'var(--border-color)';
    field.style.boxShadow = 'none';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Typing animation for hero section
function typeWriter(element, text, speed = 50, callback = null) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--accent-green)';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                if (callback) callback();
            }, 1000);
        }
    }
    type();
}

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

function setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateKonamiMode();
        }
    });
}

function activateKonamiMode() {
    // Rainbow animation
    document.body.style.animation = 'rainbow 2s infinite';
    
    addTerminalLine(
        'konami_code_activated', 
        '🎉 KONAMI CODE ACTIVATED! Welcome to rainbow mode! 🌈\n\nSpecial features unlocked:\n• Rainbow animation\n• Extra easter eggs\n• Developer mode enabled\n• Unlimited coffee ☕'
    );
    
    // Add rainbow animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .konami-mode {
            animation: rainbow 3s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Add special effects
    createFireworks();
    
    // Reset after 15 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
        addTerminalLine('konami_mode_off', 'Rainbow mode deactivated. Back to normal! ✨');
    }, 15000);
}

// Particle system for visual flair
function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.1;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = Math.random() * 0.5 + 0.2;
            this.life = Math.random() * 100 + 100;
            this.maxLife = this.life;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            if (this.life <= 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw(ctx) {
            const alpha = (this.life / this.maxLife) * 0.8;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`;
            ctx.fill();
            
            // Add glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(57, 255, 20, ${alpha * 0.2})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Store reference for cleanup
    particleSystem = { canvas, animate };
}

// Fireworks effect for special occasions
function createFireworks() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const fireworks = [];
    
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * (canvas.height * 0.3) + 50;
            this.speed = Math.random() * 3 + 2;
            this.particles = [];
            this.exploded = false;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        
        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.explode();
                }
            } else {
                this.particles.forEach(particle => particle.update());
                this.particles = this.particles.filter(particle => particle.life > 0);
            }
        }
        
        explode() {
            this.exploded = true;
            for (let i = 0; i < 15; i++) {
                this.particles.push({
                    x: this.x,
                    y: this.y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 30,
                    color: this.color
                });
            }
        }
        
        draw(ctx) {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            } else {
                this.particles.forEach(particle => {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.globalAlpha = particle.life / 30;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                });
            }
        }
    }
    
    // Create fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            fireworks.push(new Firework());
        }, i * 500);
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        fireworks.forEach(firework => {
            firework.update();
            firework.draw(ctx);
        });
        
        // Update particles
        fireworks.forEach(firework => {
            if (firework.exploded) {
                firework.particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vy += 0.1; // gravity
                    particle.life--;
                });
            }
        });
        
        if (fireworks.some(f => !f.exploded || f.particles.length > 0)) {
            requestAnimationFrame(animate);
        } else {
            // Clean up
            setTimeout(() => {
                canvas.remove();
            }, 1000);
        }
    }
    
    animate();
}

// Glitch effect for text elements
function setupGlitchEffect() {
    const glitchTexts = document.querySelectorAll('.logo, .hero h1, .terminal-header');
    
    glitchTexts.forEach(text => {
        let glitchTimeout;
        
        text.addEventListener('mouseenter', function() {
            if (glitchTimeout) clearTimeout(glitchTimeout);
            
            const original = this.textContent;
            const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
            
            let glitchCount = 0;
            const maxGlitches = 3;
            
            const glitch = () => {
                if (glitchCount >= maxGlitches) {
                    this.textContent = original;
                    return;
                }
                
                let glitchText = '';
                for (let i = 0; i < original.length; i++) {
                    if (Math.random() < 0.1) {
                        glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchText += original[i];
                    }
                }
                
                this.textContent = glitchText;
                glitchCount++;
                
                glitchTimeout = setTimeout(() => {
                    glitch();
                }, 50);
            };
            
            glitch();
        });
        
        text.addEventListener('mouseleave', function() {
            if (glitchTimeout) clearTimeout(glitchTimeout);
        });
    });
}

// Window resize handler with debouncing
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (matrixCanvas) {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
        
        if (particleSystem && particleSystem.canvas) {
            particleSystem.canvas.width = window.innerWidth;
            particleSystem.canvas.height = window.innerHeight;
        }
    }, 250);
}

window.addEventListener('resize', handleResize);

// Performance monitoring
function initPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function updateFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Log performance issues
            if (fps < 30) {
                console.warn('Performance warning: FPS dropped to', fps);
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    updateFPS();
}

// Accessibility enhancements
function setupAccessibility() {
    // Keyboard navigation for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Announce dynamic content changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(announcer);
    
    // Override addTerminalLine to announce new content
    const originalAddTerminalLine = addTerminalLine;
    addTerminalLine = function(command, output, isError) {
        originalAddTerminalLine(command, output, isError);
        
        // Announce command completion
        announcer.textContent = `Command ${command} completed`;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Theme switcher (bonus feature)
function setupThemeSwitcher() {
    let currentTheme = 'dark';
    
    commands.theme = () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('light-theme');
        
        return `Theme switched to ${currentTheme} mode! ${currentTheme === 'dark' ? '🌙' : '☀️'}`;
    };
    
    commands.themes = () => `Available themes:
• dark (default) - Classic hacker aesthetic 🌙
• light - Easy on the eyes ☀️

Use 'theme' command to toggle between themes.`;
}

// Sound effects (optional, using Web Audio API)
function setupSoundEffects() {
    let audioContext;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    function playTone(frequency, duration, type = 'sine') {
        initAudio();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Add sound command
    commands.sound = () => {
        playTone(800, 0.2);
        return 'Beep! 🔊 Sound test successful.';
    };
    
    commands.music = () => {
        // Play a simple melody
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
        notes.forEach((note, index) => {
            setTimeout(() => playTone(note, 0.3), index * 200);
        });
        return 'Playing a simple melody! 🎵';
    };
}

// Initialize everything when page loads
// Delay all initialization and animations by 10 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        // Fade in page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';

            // Initialize particle effects after fade-in
            setTimeout(() => {
                createParticles();
            }, 500);
        }, 100);

        // Initialize core features after delay
        setupTerminalInput();
        initMatrix();
        setupProjectCards();
        setupContactForm();
        setupKonamiCode();
        setupGlitchEffect();
        setupAccessibility();
        setupThemeSwitcher();
        setupSoundEffects();

        // Development performance monitoring
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            initPerformanceMonitoring();
        }

        // Show terminal welcome message after initialization
        setTimeout(() => {
            addTerminalLine(
                'system_init',
                `🚀 Welcome to Emmanuel Opoku's Interactive Portfolio Terminal!

System Status: ✅ All systems operational
Terminal Version: 2.0.0
Last Updated: ${new Date().toLocaleDateString()}

Quick Start:
• Type 'help' to see all available commands
• Try 'about', 'projects', 'skills', or 'contact'
• Use Tab for auto-completion
• Arrow keys navigate command history
• 'clear' resets the terminal

Easter Eggs: Hidden throughout - explore and discover! 🥚
Pro Tip: Try the Konami Code for a surprise! 🎮

Ready for commands...`
            );
        }, 800);

        // Hero text typing animation
        setTimeout(() => {
            const heroSubtitle = document.querySelector('.hero p');
            if (heroSubtitle) {
                const originalText = heroSubtitle.textContent;
                typeWriter(heroSubtitle, originalText, 30);
            }
        }, 1500);

    }, 10000); // 10-second delay
});



//---------------------------------CURSOR INTEGRATION---------------------------------------------
// Terminal Cursor Integration - Add this to your existing JavaScript

class TerminalCursor {
    constructor(inputElement, cursorElement, promptElement) {
        this.input = inputElement;
        this.cursor = cursorElement;
        this.prompt = promptElement;
        this.isTyping = false;
        this.typingTimeout = null;
        this.promptWidth = this.getPromptWidth();
    }

    // Calculate the width of the prompt
    getPromptWidth() {
        if (!this.prompt) return 0;
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const computedStyle = getComputedStyle(this.prompt);
        context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
        
        return context.measureText(this.prompt.textContent + ' ').width;
    }

    // Method to show typing state
    startTyping() {
        this.isTyping = true;
        this.cursor.classList.add('typing');
        
        // Clear any existing timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Stop typing state after 500ms of no activity
        this.typingTimeout = setTimeout(() => {
            this.stopTyping();
        }, 500);
    }

    // Method to stop typing state
    stopTyping() {
        this.isTyping = false;
        this.cursor.classList.remove('typing');
    }

    // Position cursor after prompt + typed text
    updatePosition() {
        const text = this.input.value;
        const textWidth = this.getTextWidth(text);
        const totalWidth = this.promptWidth + textWidth;
        
        this.cursor.style.left = totalWidth + 'px';
    }

    // Calculate text width in input
    getTextWidth(text) {
        if (!text) return 0;
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const computedStyle = getComputedStyle(this.input);
        context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
        
        return context.measureText(text).width;
    }

    // Set cursor state (error, success, etc.)
    setState(state) {
        this.cursor.className = 'cursor ' + state;
    }

    // Initialize cursor position
    init() {
        this.updatePosition();
    }
}

// Initialize the terminal cursor system
function initializeTerminalCursor() {
    const terminalInput = document.querySelector('.terminal-input input');
    const cursorElement = document.querySelector('.terminal-input .cursor');
    const promptElement = document.querySelector('.terminal-input .prompt');
    const terminal = document.querySelector('.terminal');
    
    if (terminalInput && cursorElement && promptElement) {
        const cursor = new TerminalCursor(terminalInput, cursorElement, promptElement);
        
        // Initialize cursor position
        cursor.init();
        
        // Handle typing events
        terminalInput.addEventListener('input', () => {
            if (document.activeElement === terminalInput) {
                cursor.startTyping();
                cursor.updatePosition();
            }
        });
        
        terminalInput.addEventListener('keydown', () => {
            if (document.activeElement === terminalInput) {
                cursor.startTyping();
                // Update position on next frame to account for character changes
                requestAnimationFrame(() => cursor.updatePosition());
            }
        });
        
        terminalInput.addEventListener('keyup', () => {
            if (document.activeElement === terminalInput) {
                cursor.updatePosition();
            }
        });
        
        // Handle focus states - show cursor
        terminalInput.addEventListener('focus', () => {
            terminal.classList.add('focused');
            cursorElement.style.opacity = '1';
            cursor.updatePosition();
        });
        
        // Handle blur states - hide cursor
        terminalInput.addEventListener('blur', () => {
            terminal.classList.remove('focused');
            cursor.stopTyping();
            cursorElement.style.opacity = '0';
        });
        
        // Handle command execution
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && document.activeElement === terminalInput) {
                const command = terminalInput.value.trim();
                
                // Show success or error state based on command
                if (command === 'clear' || command === 'help' || command.startsWith('echo')) {
                    cursor.setState('success');
                    setTimeout(() => cursor.setState(''), 1000);
                } else if (command && !isValidCommand(command)) {
                    cursor.setState('error');
                    setTimeout(() => cursor.setState(''), 1500);
                }
                
                // Reset cursor position after command
                setTimeout(() => {
                    cursor.updatePosition();
                }, 100);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            cursor.promptWidth = cursor.getPromptWidth();
            cursor.updatePosition();
        });
        
        return cursor;
    }
}

// Helper function to check if command is valid
function isValidCommand(command) {
    const validCommands = ['help', 'clear', 'about', 'projects', 'contact', 'skills', 'whoami'];
    const cmd = command.split(' ')[0];
    return validCommands.includes(cmd) || command.startsWith('echo');
}

// Enhanced terminal typing effect with proper cursor
function typeText(element, text, speed = 50) {
    const cursor = element.querySelector('.cursor');
    let i = 0;
    
    // Show typing state
    if (cursor) cursor.classList.add('typing');
    
    function type() {
        if (i < text.length) {
            // Insert character before cursor
            const beforeCursor = element.innerHTML.substring(0, element.innerHTML.indexOf('<span class="cursor'));
            const afterCursor = element.innerHTML.substring(element.innerHTML.indexOf('</span>') + 7);
            
            element.innerHTML = beforeCursor + text.charAt(i) + 
                              '<span class="cursor typing"></span>' + afterCursor;
            i++;
            setTimeout(type, speed);
        } else {
            // Stop typing state
            if (cursor) cursor.classList.remove('typing');
        }
    }
    
    type();
}

// Update your existing terminal command handler
function handleTerminalCommand(command) {
    const terminal = document.querySelector('.terminal-body');
    const cursor = document.querySelector('.cursor');
    
    // Add command to terminal
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="prompt">user@portfolio:~$</span> <span class="command">${command}</span>`;
    terminal.appendChild(commandLine);
    
    // Show typing state while processing
    if (cursor) cursor.classList.add('typing');
    
    // Process command and show result
    setTimeout(() => {
        const output = processCommand(command);
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line';
        outputLine.innerHTML = `<span class="output">${output}</span>`;
        terminal.appendChild(outputLine);
        
        // Update cursor state based on result
        if (cursor) {
            cursor.classList.remove('typing');
            if (output.includes('Error') || output.includes('not found')) {
                cursor.classList.add('error');
                setTimeout(() => cursor.classList.remove('error'), 1500);
            }
        }
        
        terminal.scrollTop = terminal.scrollHeight;
    }, 100);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTerminalCursor();
});