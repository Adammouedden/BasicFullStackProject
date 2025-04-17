function loadResume(){
    //Fetcv the PDF from teh backend and display it in iframe
    const iframe = document.getElementById('resumeViewer');
    iframe.src = '/api/resume';
    iframe.style.display = 'block';
}