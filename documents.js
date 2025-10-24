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
    },

    'spec_phen_023': {
        title: 'SPECIMEN PHENOMENA 023 A-C',
        classification: 'RESTRICTED / GAMMA',
        fileType: 'DOCUMENT',
        documentId: 'g35f-67i-████',
        date: '07/04/2005 5:39:56 AM',
        specimenNumber: 'BIO_023',
        specimenClassification: 'ANIMALIA/ACTINOPTERYGII',
        containmentClass: 'Level 1/Least Concerned',
        notes: 'Specimen is hostile, do not enter enclosure',
        content: `

**Containment Procedures:** BIO_023_A is to be kept in an acrylic cylinder aquarium that is no bigger than 30 meters in height and 10 meters in diameter, filled with 3.5% saline water. Salt levels to be checked every hour. Water level should not exceed more than 93.3% capacity to avoid unnecessary contact with the specimen. Armed guards are unnecessary as BIO_023_A is unable to move or survive outside of its containment. Food in the form of twenty (20) Blue mackerel (Scomber australasicus) is to be provided every day via the hatch.

Substance response tests are to be done through the dispersal tubes located at the side of the enclosure. Removing BIO_023_A from its enclosure is strictly forbidden. Due to the nature of BIO_023_B-D, they cannot be separated from each other at this time. They are to be kept in Level 1 cold storage in Lab 3-F

**Description-** BIO_023_A is an aquatic organism with a humanoid upper body approximately 0.7 meters in length and a fish tail resembling a Sailfish (Scomber gladius), approximately 5 meters in length. Skin on both halves comprises blue and yellow scales that are more durable than both sailfish scales and human skin. The humanoid half seems androgynous in nature, with no presence of mammary glands or umbilicus. It has two larger "main" eyes and two smaller "eyes" on the sides of its head, though preliminary examinations seem to suggest BIO_023_A has little to no usable vision. It is yet to be discovered how BIO_023_A traverses its environment.

Despite apparent physical similarities to humans, BIO_023_A seems to possess sub-human intelligence. Psychological tests suggest the specimen lacks self-awareness and significant object permanence. Interrupted scans (see Incident BIO_023_A-1) suggest the general cerebral size and density is similar to that of a domestic dog (Canis familiaris)`
    }
};

// Function to get document by ID
function getDocument(docId) {
    return documents[docId] || null;
}

// Function to render document metadata
function renderMetadata(doc) {
    // Define metadata fields that are actually used in documents
    const metadataFields = [
        { key: 'classification', label: 'CLASSIFICATION', required: true },
        { key: 'fileType', label: 'FILE TYPE', required: true },
        { key: 'documentId', label: 'DOCUMENT ID', required: true },
        { key: 'date', label: 'DATE', required: true },
        { key: 'from', label: 'FROM', required: false },
        { key: 'to', label: 'TO', required: false },
        { key: 'specimenNumber', label: 'SPECIMEN(S) #', required: false },
        { key: 'specimenClassification', label: 'CLASSIFICATION', required: false },
        { key: 'containmentClass', label: 'CONTAINMENT CLASS', required: false },
        { key: 'notes', label: 'NOTES', required: false }
    ];

    return metadataFields
        .filter(field => field.required || doc[field.key]) // Only show if required or has value
        .map(field => {
            const value = doc[field.key];
            const isRedacted = value && value.includes && value.includes('█');
            return `
                <div class="metadata-row">
                    <span class="label">${field.label}:</span>
                    <span class="value ${isRedacted ? 'redacted' : ''}">${value}</span>
                </div>
            `;
        })
        .join('');
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

    // Process content to handle redacted sections and bold text
    let processedContent = doc.content.replace(/██+/g, '<span class="redacted">$&</span>');
    processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Split into paragraphs and add classes for structured data
    const paragraphs = processedContent.split('\n\n').map(paragraph => {
        const trimmed = paragraph.trim();
        if (trimmed.startsWith('<strong>') && trimmed.includes(':</strong>')) {
            return `<p class="structured-field">${paragraph.replace(/\n/g, '<br>')}</p>`;
        }
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
    });

    processedContent = paragraphs.join('');

    container.innerHTML = `
        <div class="document-header">
            <div class="department-title">DEPARTMENT OF EXTRANORMAL PHENOMENA: BIOSCIENCE UNIT</div>
        </div>
        
        <div class="document-content">
            <div class="document-metadata">
                ${renderMetadata(doc)}
            </div>

            <div class="document-body">
                ${processedContent}
            </div>
        </div>


    `;
}

// Initialize document on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('doc') || 'first_reports';
    console.log('Looking for document ID:', docId);
    console.log('Available documents:', Object.keys(documents));
    renderDocument(docId);
});