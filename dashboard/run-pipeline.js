const fs = require('fs');
const path = require('path');

const statusFile = path.join(__dirname, 'status.json');

function updateStatus(status) {
    fs.writeFileSync(statusFile, JSON.stringify({ pipelineStatus: status }, null, 2));
    console.log(`[${new Date().toISOString()}] Status updated to: ${status}`);
}

console.log('Triggering pipeline simulation...');

// Set to running
updateStatus('running');

// Wait 4 seconds, then set to success
setTimeout(() => {
    updateStatus('success');
    
    // Reset back to idle after a few seconds so it can be run again easily
    setTimeout(() => {
        updateStatus('idle');
        console.log('Simulation complete. Status reset to idle.');
    }, 3000);
    
}, 4000);
