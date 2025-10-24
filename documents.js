// Document data structure
const documents = {
    'first_reports': {
        title: 'FIRST REPORTS',
        classification: 'RESTRICTED / BETA',
        fileType: 'MEMO',
        documentId: '████████████',
        date: '05/21/2005 5:39:56 AM',
        from: 'Dr. H.Sakamoto',
        to: 'Administrator O. N. Lowell',
        content: `Administrator Lowell,

I am putting in yet another formal request for provisional funding to investigate reports of extranormal phenomenon in ██████ █████. New corroborating reports have continued to trickle in about sightings of an abnormal fish-like organism. I understand the area already has the prevailing mythology of the ningyo; however, digital and analog instruments on the USS Campbell (Hull number: DDG-85) have detected an unidentified vessel approximately 30°48'06.5"N 131°23'35.7"E and 20m underwater traveling NW at approximately 31 meters per second, faster than any aquatic animal or registered vessel in the area. Some of the seamen on the ship also reported sightings. In order to avoid a Broken Veil scenario, I took the initiative to travel to the ship myself to discredit the seamen and have them dismissed from duty.

I am fully aware that my requests to look into reports of an abnormal creature around the coast ██████ have already been rejected by the Assignments and Budgeting Council due to "insufficient data"; however, I believe the sightings and reports are founded, and continuing to ignore them could constitute a compromise in national and international security, along with prolonged risk to continued confidential operations. This thing, whatever it is, is not another strange plant or glow-in-the-dark ameba; the specimen will not wait rooted to be captured, we must act now.

-Dr. Hidiki Sakamoto`
    },
    
    'imsorry': {
        title: 'PERSONAL NOTE',
        classification: 'UNCLASSIFIED',
        fileType: 'TEXT FILE',
        documentId: 'N/A',
        date: '11/29/2005 3:42:17 AM',
        from: 'Dr. H.Sakamoto',
        to: 'Personal Log',
        content: `I'm sorry.

I should have listened to the warnings. The containment protocols weren't enough. 

It's all my fault.

The screaming has stopped now. That's somehow worse than when it was happening.

If anyone finds this, don't look for the specimen. Don't try to contain it again.

Some things should stay in the deep.

-H.S.`
    }
};

// Function to get document by ID
function getDocument(docId) {
    return documents[docId] || null;
}

// Function to render document
function renderDocument(docId) {
    const doc = getDocument(docId);
    if (!doc) {
        document.body.innerHTML = '<h1>Document not found</h1>';
        return;
    }

    const container = document.querySelector('.document-container');
    if (!container) return;

    // Process content to handle redacted sections
    const processedContent = doc.content.replace(/██+/g, '<span class="redacted">$&</span>');
    
    container.innerHTML = `
        <div class="document-header">
            <div class="department-title">DEPARTMENT OF EXTRANORMAL PHENOMENA: BIOSCIENCE UNIT</div>
        </div>
        
        <div class="document-content">
            <div class="document-metadata">
                <div class="metadata-row">
                    <span class="label">CLASSIFICATION:</span>
                    <span class="value">${doc.classification}</span>
                </div>
                <div class="metadata-row">
                    <span class="label">FILE TYPE:</span>
                    <span class="value">${doc.fileType}</span>
                </div>
                <div class="metadata-row">
                    <span class="label">DOCUMENT ID:</span>
                    <span class="value ${doc.documentId.includes('█') ? 'redacted' : ''}">${doc.documentId}</span>
                </div>
                <div class="metadata-row">
                    <span class="label">DATE:</span>
                    <span class="value">${doc.date}</span>
                </div>
                <div class="metadata-row">
                    <span class="label">FROM:</span>
                    <span class="value">${doc.from}</span>
                </div>
                <div class="metadata-row">
                    <span class="label">TO:</span>
                    <span class="value">${doc.to}</span>
                </div>
            </div>

            <div class="document-body">
                ${processedContent.split('\n\n').map(paragraph => 
                    `<p>${paragraph.replace(/\n/g, '<br>')}</p>`
                ).join('')}
            </div>
        </div>


    `;
}

// Initialize document on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('doc') || 'first_reports';
    renderDocument(docId);
});