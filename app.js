// FloatChat Ocean Data Explorer - Enhanced with Dynamic Theme System (Fixed)

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.storageKey = 'floatchat_theme';
        
        this.init();
    }
    
    init() {
        // Load saved theme or use system preference
        const savedTheme = this.getSavedTheme();
        const initialTheme = savedTheme || this.systemPreference;
        
        this.setTheme(initialTheme, false); // Don't animate initial theme
        this.setupEventListeners();
        this.setupSystemThemeListener();
    }
    
    setupEventListeners() {
        // Wait for DOM to be ready
        const setupToggle = () => {
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                // Remove any existing listeners
                const newToggle = themeToggle.cloneNode(true);
                themeToggle.parentNode.replaceChild(newToggle, themeToggle);
                
                // Add click listener
                newToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleTheme();
                });
                
                // Keyboard accessibility
                newToggle.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleTheme();
                    }
                });
                
                console.log('Theme toggle events attached');
            } else {
                console.error('Theme toggle element not found');
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupToggle);
        } else {
            setupToggle();
        }
    }
    
    setupSystemThemeListener() {
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-update if user hasn't manually set a preference
            if (!this.getSavedTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        console.log(`Switching theme from ${this.currentTheme} to ${newTheme}`);
        this.setTheme(newTheme);
        this.announceThemeChange(newTheme);
    }
    
    setTheme(theme, animate = true) {
        if (animate) {
            // Add transition class for smooth animation
            document.body.classList.add('theme-transitioning');
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
        }
        
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        console.log(`Theme set to: ${theme}`);
        
        // Update toggle button state
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-checked', theme === 'dark');
            themeToggle.setAttribute('aria-label', 
                `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        }
        
        // Save theme preference
        this.saveTheme(theme);
        
        // Update any existing charts with new theme colors
        if (window.floatChatApp && window.floatChatApp.currentChart) {
            window.floatChatApp.updateChartTheme();
        }
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme, previousTheme: this.currentTheme } 
        }));
    }
    
    getSavedTheme() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (e) {
            return null;
        }
    }
    
    saveTheme(theme) {
        try {
            localStorage.setItem(this.storageKey, theme);
            console.log(`Theme ${theme} saved to localStorage`);
        } catch (e) {
            // Ignore localStorage errors
            console.log('Could not save theme preference');
        }
    }
    
    announceThemeChange(theme) {
        // Accessibility: Announce theme change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        announcement.textContent = `Switched to ${theme} theme`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getThemeColors() {
        const root = document.documentElement;
        const style = getComputedStyle(root);
        
        return {
            primary: style.getPropertyValue('--theme-accent-primary').trim(),
            secondary: style.getPropertyValue('--theme-accent-secondary').trim(),
            success: style.getPropertyValue('--theme-accent-success').trim(),
            warning: style.getPropertyValue('--theme-accent-warning').trim(),
            text: style.getPropertyValue('--theme-text-primary').trim(),
            textSecondary: style.getPropertyValue('--theme-text-secondary').trim(),
            background: style.getPropertyValue('--theme-bg-primary').trim(),
            surface: style.getPropertyValue('--theme-bg-secondary').trim()
        };
    }
}

class FloatChatApp {
    constructor() {
        this.chatMessages = [];
        this.isTyping = false;
        this.currentChart = null;
        this.currentMap = null;
        this.themeManager = new ThemeManager();
        
        // Mock data from the application specifications
        this.mockData = {
            sampleQueries: [
                "Show me ocean temperature in the Pacific",
                "What's the salinity near the equator?",
                "Display Argo float positions globally",
                "Analyze temperature trends over time",
                "Show me current ocean data for the Atlantic",
                "What are the latest float measurements?"
            ],
            mockArgoData: {
                floats: [
                    {"id": "1901393", "lat": 45.2, "lon": -30.1, "temp": 15.2, "salinity": 35.1, "date": "2025-09-10"},
                    {"id": "1901394", "lat": 35.8, "lon": -40.5, "temp": 18.7, "salinity": 35.8, "date": "2025-09-10"},
                    {"id": "1901395", "lat": 25.3, "lon": -50.2, "temp": 22.1, "salinity": 36.2, "date": "2025-09-10"},
                    {"id": "1901396", "lat": 15.6, "lon": -60.8, "temp": 26.5, "salinity": 36.5, "date": "2025-09-10"}
                ],
                temperatureData: [
                    {"depth": 0, "temperature": 25.2, "location": "Atlantic"},
                    {"depth": 100, "temperature": 22.1, "location": "Atlantic"},
                    {"depth": 500, "temperature": 15.8, "location": "Atlantic"},
                    {"depth": 1000, "temperature": 8.2, "location": "Atlantic"},
                    {"depth": 2000, "temperature": 3.1, "location": "Atlantic"}
                ],
                salinityData: [
                    {"depth": 0, "salinity": 36.5, "location": "Pacific"},
                    {"depth": 100, "salinity": 36.2, "location": "Pacific"},
                    {"depth": 500, "salinity": 35.8, "location": "Pacific"},
                    {"depth": 1000, "salinity": 35.4, "location": "Pacific"},
                    {"depth": 2000, "salinity": 35.1, "location": "Pacific"}
                ]
            },
            botResponses: {
                temperature: "The ocean temperature data shows interesting variations with depth. Surface temperatures are typically warmest, decreasing with depth due to reduced solar heating.",
                salinity: "Ocean salinity patterns are influenced by evaporation, precipitation, and freshwater inputs. The data shows typical oceanic salinity ranges.",
                floats: "Argo floats are autonomous instruments that measure temperature and salinity profiles. Currently tracking multiple active floats across ocean basins.",
                trends: "Ocean temperature trends indicate warming patterns consistent with climate change impacts on marine systems.",
                default: "I can help you explore Argo ocean data including temperature, salinity, and float positions. What would you like to learn about?"
            }
        };
        
        this.init();
    }
    
    init() {
        // Make app globally available for theme updates
        window.floatChatApp = this;
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }
    
    setupApplication() {
        console.log('Setting up FloatChat application...');
        this.setupEventListeners();
        this.handlePreloader();
        this.initializeChat();
        this.loadChatHistory();
        this.setupThemeListeners();
        console.log('FloatChat application setup complete');
    }
    
    setupThemeListeners() {
        // Listen for theme changes to update components
        window.addEventListener('themechange', (e) => {
            this.onThemeChange(e.detail.theme);
        });
    }
    
    onThemeChange(newTheme) {
        console.log(`Theme changed to: ${newTheme}`);
        // Update any theme-dependent components
        if (this.currentChart) {
            this.updateChartTheme();
        }
        
        // Add any other theme-dependent updates here
        this.updateMapTheme();
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Wait a bit for elements to be ready
        setTimeout(() => {
            // Chat input and send button
            const chatInput = document.getElementById('chatInput');
            const sendButton = document.getElementById('sendButton');
            
            if (chatInput) {
                console.log('Chat input found, attaching events');
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
                
                // Test input functionality
                chatInput.addEventListener('input', (e) => {
                    console.log('Input event detected:', e.target.value);
                });
            } else {
                console.error('Chat input element not found');
            }
            
            if (sendButton) {
                console.log('Send button found, attaching click event');
                sendButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Send button clicked');
                    this.sendMessage();
                });
            } else {
                console.error('Send button element not found');
            }
            
            // Suggestion buttons
            const suggestionBtns = document.querySelectorAll('.suggestion-btn');
            console.log(`Found ${suggestionBtns.length} suggestion buttons`);
            
            suggestionBtns.forEach((btn, index) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const query = btn.getAttribute('data-query');
                    console.log(`Suggestion button ${index} clicked:`, query);
                    if (chatInput) {
                        chatInput.value = query;
                        this.sendMessage();
                    }
                });
            });
            
            // Visualization panel controls
            const closePanelBtn = document.getElementById('closePanelBtn');
            if (closePanelBtn) {
                closePanelBtn.addEventListener('click', () => this.closeVisualizationPanel());
            }
            
            // Tab switching
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const tabName = e.target.getAttribute('data-tab');
                    this.switchTab(tabName);
                });
            });
            
            // Close panel on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeVisualizationPanel();
                }
            });
            
            // Close panel on backdrop click
            document.addEventListener('click', (e) => {
                const panel = document.getElementById('visualizationPanel');
                if (e.target === panel) {
                    this.closeVisualizationPanel();
                }
            });
            
            console.log('Event listeners setup complete');
        }, 100);
    }
    
    handlePreloader() {
        // Show preloader for 3 seconds with smooth transition
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            const app = document.getElementById('app');
            
            if (preloader && app) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                    app.classList.remove('hidden');
                    app.style.opacity = '0';
                    app.style.transition = 'opacity 0.5s ease';
                    
                    requestAnimationFrame(() => {
                        app.style.opacity = '1';
                    });
                }, 500);
            }
        }, 3000);
    }
    
    initializeChat() {
        // Add welcome message if not already present
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer && messagesContainer.children.length <= 1) {
            // Welcome message is already in HTML
            console.log('Chat initialized');
        }
    }
    
    sendMessage() {
        console.log('sendMessage called');
        const input = document.getElementById('chatInput');
        
        if (!input) {
            console.error('Chat input not found');
            return;
        }
        
        const message = input.value.trim();
        console.log('Message to send:', message);
        
        if (!message || this.isTyping) {
            console.log('No message or typing in progress');
            return;
        }
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator and process response
        this.showTypingIndicator();
        
        // Simulate processing time
        setTimeout(() => {
            this.processUserQuery(message);
        }, 1000 + Math.random() * 2000);
    }
    
    processUserQuery(query) {
        console.log('Processing query:', query);
        const lowerQuery = query.toLowerCase();
        let response = this.mockData.botResponses.default;
        let shouldShowVisualization = false;
        let visualizationType = 'chart';
        
        // Analyze query and determine response
        if (lowerQuery.includes('temperature') || lowerQuery.includes('temp')) {
            response = this.mockData.botResponses.temperature;
            shouldShowVisualization = true;
            visualizationType = 'temperature';
        } else if (lowerQuery.includes('salinity') || lowerQuery.includes('salt')) {
            response = this.mockData.botResponses.salinity;
            shouldShowVisualization = true;
            visualizationType = 'salinity';
        } else if (lowerQuery.includes('float') || lowerQuery.includes('position') || lowerQuery.includes('map')) {
            response = this.mockData.botResponses.floats;
            shouldShowVisualization = true;
            visualizationType = 'map';
        } else if (lowerQuery.includes('trend') || lowerQuery.includes('time') || lowerQuery.includes('analyze')) {
            response = this.mockData.botResponses.trends;
            shouldShowVisualization = true;
            visualizationType = 'trends';
        } else if (lowerQuery.includes('pacific')) {
            response = "The Pacific Ocean is the largest ocean basin, covering about 63 million square miles. Temperature data shows typical tropical to polar gradients with beautiful variations across depths.";
            shouldShowVisualization = true;
            visualizationType = 'temperature';
        } else if (lowerQuery.includes('atlantic')) {
            response = "The Atlantic Ocean data reveals complex circulation patterns and temperature structures influenced by the Gulf Stream and other currents. Let me show you the temperature profile.";
            shouldShowVisualization = true;
            visualizationType = 'temperature';
        } else if (lowerQuery.includes('theme') || lowerQuery.includes('dark') || lowerQuery.includes('light')) {
            response = `You can toggle between light and dark themes using the switch in the header! The current theme is ${this.themeManager.getCurrentTheme()} mode. The ocean animations and colors adapt beautifully to each theme.`;
        }
        
        this.hideTypingIndicator();
        this.addMessage(response, 'bot');
        
        if (shouldShowVisualization) {
            setTimeout(() => {
                this.showVisualizationPanel(visualizationType);
            }, 500);
        }
        
        this.saveChatHistory();
    }
    
    addMessage(text, sender) {
        console.log(`Adding ${sender} message:`, text);
        const messagesContainer = document.getElementById('chatMessages');
        
        if (!messagesContainer) {
            console.error('Messages container not found');
            return;
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        content.appendChild(messageText);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        messagesContainer.appendChild(messageDiv);
        
        // Store message
        this.chatMessages.push({ text, sender, timestamp: new Date().toISOString() });
        
        // Smooth scroll to bottom
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.classList.remove('hidden');
            this.scrollToBottom();
        }
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.classList.add('hidden');
        }
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
    
    showVisualizationPanel(type) {
        console.log('Showing visualization panel:', type);
        const panel = document.getElementById('visualizationPanel');
        if (panel) {
            panel.classList.remove('hidden');
            
            // Set appropriate tab
            if (type === 'map') {
                this.switchTab('map');
                setTimeout(() => this.initializeMap(), 200);
            } else {
                this.switchTab('chart');
                setTimeout(() => this.createChart(type), 200);
            }
        }
    }
    
    closeVisualizationPanel() {
        const panel = document.getElementById('visualizationPanel');
        if (panel) {
            panel.classList.add('hidden');
        }
        
        // Cleanup
        if (this.currentChart) {
            this.currentChart.destroy();
            this.currentChart = null;
        }
        if (this.currentMap) {
            this.currentMap.remove();
            this.currentMap = null;
        }
    }
    
    switchTab(tabName) {
        console.log('Switching to tab:', tabName);
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
        });
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabName + 'Tab');
        });
        
        // Initialize content if needed
        if (tabName === 'map' && !this.currentMap) {
            setTimeout(() => this.initializeMap(), 100);
        }
    }
    
    getThemeAwareChartColors() {
        const theme = this.themeManager.getCurrentTheme();
        
        if (theme === 'dark') {
            return {
                primary: '#22d3ee',
                secondary: '#fb923c', 
                success: '#34d399',
                warning: '#fbbf24',
                gradient: ['rgba(34,211,238,0.8)', 'rgba(34,211,238,0.1)'],
                border: '#22d3ee',
                grid: 'rgba(226,232,240,0.1)',
                text: '#e2e8f0'
            };
        } else {
            return {
                primary: '#06b6d4',
                secondary: '#f97316',
                success: '#10b981',
                warning: '#f59e0b', 
                gradient: ['rgba(6,182,212,0.8)', 'rgba(6,182,212,0.1)'],
                border: '#06b6d4',
                grid: 'rgba(30,41,59,0.1)',
                text: '#1e293b'
            };
        }
    }
    
    createChart(type) {
        console.log('Creating chart:', type);
        const ctx = document.getElementById('dataChart');
        if (!ctx) {
            console.error('Chart canvas not found');
            return;
        }
        
        // Cleanup previous chart
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        const themeColors = this.getThemeAwareChartColors();
        let chartData, chartConfig;
        
        switch (type) {
            case 'temperature':
                chartData = {
                    labels: this.mockData.mockArgoData.temperatureData.map(d => `${d.depth}m`),
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: this.mockData.mockArgoData.temperatureData.map(d => d.temperature),
                        backgroundColor: themeColors.gradient[1],
                        borderColor: themeColors.primary,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: themeColors.primary,
                        pointBorderColor: themeColors.text,
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                };
                break;
                
            case 'salinity':
                chartData = {
                    labels: this.mockData.mockArgoData.salinityData.map(d => `${d.depth}m`),
                    datasets: [{
                        label: 'Salinity (PSU)',
                        data: this.mockData.mockArgoData.salinityData.map(d => d.salinity),
                        backgroundColor: 'rgba(249,115,22,0.2)',
                        borderColor: themeColors.secondary,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: themeColors.secondary,
                        pointBorderColor: themeColors.text,
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                };
                break;
                
            case 'trends':
                // Generate trend data
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                const tempTrend = [20.1, 20.3, 20.8, 21.2, 21.5, 21.8];
                chartData = {
                    labels: months,
                    datasets: [{
                        label: 'Average Temperature (°C)',
                        data: tempTrend,
                        backgroundColor: themeColors.gradient[1],
                        borderColor: themeColors.success,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: themeColors.success,
                        pointBorderColor: themeColors.text,
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                };
                break;
                
            default:
                chartData = {
                    labels: ['Surface', '100m', '500m', '1000m', '2000m'],
                    datasets: [{
                        label: 'Ocean Data',
                        data: [25, 22, 16, 8, 3],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                        borderColor: themeColors.primary,
                        borderWidth: 2
                    }]
                };
        }
        
        chartConfig = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: themeColors.text,
                            font: {
                                family: 'var(--font-family-base)',
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: this.themeManager.getCurrentTheme() === 'dark' 
                            ? 'rgba(30,41,59,0.95)' 
                            : 'rgba(248,250,252,0.95)',
                        titleColor: themeColors.text,
                        bodyColor: themeColors.text,
                        borderColor: themeColors.primary,
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: themeColors.text,
                            font: {
                                family: 'var(--font-family-base)'
                            }
                        },
                        grid: {
                            color: themeColors.grid
                        },
                        border: {
                            color: themeColors.grid
                        }
                    },
                    x: {
                        ticks: {
                            color: themeColors.text,
                            font: {
                                family: 'var(--font-family-base)'
                            }
                        },
                        grid: {
                            color: themeColors.grid
                        },
                        border: {
                            color: themeColors.grid
                        }
                    }
                }
            }
        };
        
        try {
            this.currentChart = new Chart(ctx, chartConfig);
            console.log('Chart created successfully');
        } catch (error) {
            console.error('Error creating chart:', error);
        }
    }
    
    updateChartTheme() {
        if (!this.currentChart) return;
        
        const themeColors = this.getThemeAwareChartColors();
        
        // Update chart colors
        this.currentChart.options.plugins.legend.labels.color = themeColors.text;
        this.currentChart.options.scales.y.ticks.color = themeColors.text;
        this.currentChart.options.scales.x.ticks.color = themeColors.text;
        this.currentChart.options.scales.y.grid.color = themeColors.grid;
        this.currentChart.options.scales.x.grid.color = themeColors.grid;
        this.currentChart.options.scales.y.border.color = themeColors.grid;
        this.currentChart.options.scales.x.border.color = themeColors.grid;
        
        // Update tooltip colors
        this.currentChart.options.plugins.tooltip.backgroundColor = 
            this.themeManager.getCurrentTheme() === 'dark' 
                ? 'rgba(30,41,59,0.95)' 
                : 'rgba(248,250,252,0.95)';
        this.currentChart.options.plugins.tooltip.titleColor = themeColors.text;
        this.currentChart.options.plugins.tooltip.bodyColor = themeColors.text;
        this.currentChart.options.plugins.tooltip.borderColor = themeColors.primary;
        
        // Update dataset colors
        this.currentChart.data.datasets.forEach(dataset => {
            if (dataset.borderColor === '#22d3ee' || dataset.borderColor === '#06b6d4') {
                dataset.borderColor = themeColors.primary;
                dataset.pointBackgroundColor = themeColors.primary;
            } else if (dataset.borderColor === '#fb923c' || dataset.borderColor === '#f97316') {
                dataset.borderColor = themeColors.secondary;
                dataset.pointBackgroundColor = themeColors.secondary;
            } else if (dataset.borderColor === '#34d399' || dataset.borderColor === '#10b981') {
                dataset.borderColor = themeColors.success;
                dataset.pointBackgroundColor = themeColors.success;
            }
            dataset.pointBorderColor = themeColors.text;
        });
        
        this.currentChart.update();
    }
    
    initializeMap() {
        console.log('Initializing map');
        const mapContainer = document.getElementById('oceanMap');
        if (!mapContainer || this.currentMap) return;
        
        try {
            // Initialize Leaflet map
            this.currentMap = L.map('oceanMap').setView([30, -30], 3);
            
            // Choose tile layer based on theme
            const isDark = this.themeManager.getCurrentTheme() === 'dark';
            const tileLayer = isDark 
                ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                : 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
                
            const attribution = isDark 
                ? '© Stadia Maps © OpenMapTiles © OpenStreetMap'
                : '© Esri, GEBCO, NOAA';
            
            L.tileLayer(tileLayer, {
                attribution: attribution,
                maxZoom: 10
            }).addTo(this.currentMap);
            
            // Add Argo float markers
            this.mockData.mockArgoData.floats.forEach(float => {
                const themeColors = this.getThemeAwareChartColors();
                const marker = L.marker([float.lat, float.lon])
                    .addTo(this.currentMap)
                    .bindPopup(`
                        <div style="color: ${isDark ? '#e2e8f0' : '#1e293b'}; font-family: var(--font-family-base);">
                            <strong>Float ID: ${float.id}</strong><br>
                            <span style="color: ${themeColors.primary};">Temperature: ${float.temp}°C</span><br>
                            <span style="color: ${themeColors.secondary};">Salinity: ${float.salinity} PSU</span><br>
                            <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">Date: ${float.date}</span>
                        </div>
                    `);
            });
            
            // Add temperature overlay visualization
            this.addTemperatureOverlay();
            console.log('Map initialized successfully');
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }
    
    updateMapTheme() {
        if (!this.currentMap) return;
        
        // Remove existing map and reinitialize with new theme
        this.currentMap.remove();
        this.currentMap = null;
        setTimeout(() => this.initializeMap(), 100);
    }
    
    addTemperatureOverlay() {
        if (!this.currentMap) return;
        
        const themeColors = this.getThemeAwareChartColors();
        
        // Create temperature gradient circles
        const tempZones = [
            { lat: 0, lon: -30, temp: 28, radius: 800000 },
            { lat: 30, lon: -60, temp: 20, radius: 600000 },
            { lat: 60, lon: -20, temp: 12, radius: 400000 },
            { lat: -30, lon: -40, temp: 18, radius: 700000 }
        ];
        
        tempZones.forEach(zone => {
            const color = this.getTemperatureColor(zone.temp);
            L.circle([zone.lat, zone.lon], {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
                radius: zone.radius
            }).addTo(this.currentMap)
            .bindTooltip(`Temperature: ${zone.temp}°C`);
        });
    }
    
    getTemperatureColor(temp) {
        const themeColors = this.getThemeAwareChartColors();
        if (temp > 25) return themeColors.secondary; // Warm
        if (temp > 20) return themeColors.primary; // Moderate
        if (temp > 15) return themeColors.success; // Cool
        return themeColors.warning; // Cold
    }
    
    saveChatHistory() {
        try {
            localStorage.setItem('floatchat_history', JSON.stringify(this.chatMessages));
        } catch (e) {
            // Ignore localStorage errors in case it's not available
            console.log('Could not save chat history');
        }
    }
    
    loadChatHistory() {
        try {
            const saved = localStorage.getItem('floatchat_history');
            if (saved) {
                this.chatMessages = JSON.parse(saved);
                // Only reload recent messages (last 20)
                const recentMessages = this.chatMessages.slice(-20);
                
                recentMessages.forEach(msg => {
                    if (msg.sender !== 'bot' || !msg.text.includes('Welcome to FloatChat')) {
                        this.addMessageToDOM(msg.text, msg.sender);
                    }
                });
            }
        } catch (e) {
            // Ignore localStorage errors
            console.log('Could not load chat history');
        }
    }
    
    addMessageToDOM(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        content.appendChild(messageText);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        messagesContainer.appendChild(messageDiv);
    }
}

// Enhanced ocean-themed interactive features
class OceanEffects {
    constructor() {
        this.themeManager = null;
        this.initializeEffects();
    }
    
    setThemeManager(themeManager) {
        this.themeManager = themeManager;
    }
    
    initializeEffects() {
        this.addClickRipples();
        this.addHoverEffects();
        this.addParallaxScrolling();
        this.addThemeAwareAnimations();
    }
    
    addClickRipples() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .suggestion-btn, .send-button, .theme-toggle')) {
                this.createRipple(e);
            }
        });
    }
    
    createRipple(e) {
        const ripple = document.createElement('div');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const themeColor = this.themeManager ? 
            this.themeManager.getThemeColors().primary : 
            '#22d3ee';
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: ${themeColor.replace(')', ', 0.5)')};
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    addHoverEffects() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .theme-transitioning * {
                transition-duration: 300ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    addParallaxScrolling() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.wave-layer');
            
            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 0.2;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    addThemeAwareAnimations() {
        // Listen for theme changes to update animations
        window.addEventListener('themechange', (e) => {
            this.updateAnimationsForTheme(e.detail.theme);
        });
    }
    
    updateAnimationsForTheme(theme) {
        const floatingElements = document.querySelectorAll('.fish, .jellyfish');
        
        if (theme === 'dark') {
            // Add bioluminescent glow effect for dark theme
            floatingElements.forEach(el => {
                el.style.filter = 'drop-shadow(0 0 15px var(--ocean-foam)) brightness(1.2)';
            });
        } else {
            // Standard effect for light theme
            floatingElements.forEach(el => {
                el.style.filter = 'drop-shadow(0 0 10px var(--ocean-foam))';
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing FloatChat...');
    
    try {
        const app = new FloatChatApp();
        const effects = new OceanEffects();
        
        // Connect theme manager to effects
        effects.setThemeManager(app.themeManager);
        
        // Add some extra interactive touches
        const logo = document.querySelector('.logo-icon');
        if (logo) {
            logo.addEventListener('click', () => {
                logo.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    logo.style.transform = '';
                }, 500);
            });
        }
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '/':
                        e.preventDefault();
                        document.getElementById('chatInput')?.focus();
                        break;
                    case 'k':
                        e.preventDefault();
                        document.getElementById('chatInput')?.focus();
                        break;
                    case 'd':
                        e.preventDefault();
                        app.themeManager.toggleTheme();
                        break;
                }
            }
        });
        
        // Add theme announcement for screen readers
        const announceTheme = () => {
            const currentTheme = app.themeManager.getCurrentTheme();
            console.log(`🌊 FloatChat initialized with ${currentTheme} theme!`);
        };
        
        setTimeout(announceTheme, 1000);
        
        console.log('🌊 FloatChat Ocean Data Explorer with Enhanced Theme System initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing FloatChat:', error);
    }
});