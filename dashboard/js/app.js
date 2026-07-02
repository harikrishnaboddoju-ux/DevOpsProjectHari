document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        themeToggleBtn.innerHTML = newTheme === 'dark' ? '<span class="toggle-icon">☼</span> Light Mode' : '<span class="toggle-icon">☾</span> Dark Mode';
    });

    // Dynamic Polling Logic
    const overlay = document.getElementById('build-overlay');
    const statusBadge = document.getElementById('latest-status-badge');
    const activityLog = document.getElementById('pipeline-activity-log');
    
    let currentStatus = 'idle';
    let runCounter = 1025;

    async function fetchStatus() {
        try {
            // Add a cache buster to prevent browser caching
            const response = await fetch(`status.json?t=${new Date().getTime()}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            handleStatusChange(data.pipelineStatus);
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    }

    function handleStatusChange(newStatus) {
        if (newStatus === currentStatus) return; // No change
        
        currentStatus = newStatus;
        
        if (newStatus === 'running') {
            // Show loading overlay
            overlay.classList.remove('hidden');
            statusBadge.textContent = 'RUNNING...';
            statusBadge.style.color = 'var(--color-warn)';
            statusBadge.style.textShadow = 'none';
        } 
        else if (newStatus === 'success') {
            // Hide overlay
            overlay.classList.add('hidden');
            
            // Update Status Badge
            statusBadge.textContent = 'SUCCESS';
            statusBadge.style.color = 'var(--color-success)';
            statusBadge.style.textShadow = 'var(--glow-success)';
            
            // Add to activity log
            addNewLogEntry();
        }
        else if (newStatus === 'idle') {
            // Ensure overlay is hidden if reset to idle without success
            overlay.classList.add('hidden');
        }
    }

    function addNewLogEntry() {
        const row = document.createElement('div');
        row.className = 'log-row';
        
        row.innerHTML = `
            <div class="log-run">#${runCounter++}</div>
            <div class="log-status success">SUCCESS</div>
            <div class="log-time">Just now</div>
            <div class="log-msg">Automated build triggered by status.json</div>
        `;
        
        // Prepend to log
        activityLog.insertBefore(row, activityLog.firstChild);
        
        // Remove old logs if > 5
        if (activityLog.children.length > 5) {
            activityLog.removeChild(activityLog.lastChild);
        }
    }

    // Start Polling every 2 seconds
    setInterval(fetchStatus, 2000);
    
    // Initial fetch
    fetchStatus();
});
