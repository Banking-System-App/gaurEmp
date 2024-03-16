function doPost(e) {
    var name = e.parameter.name;
    var email = e.parameter.email;
    var phone = e.parameter.phone;
    var description = e.parameter.description;
    
    // Open your Google Form by ID
    var form = FormApp.openById('19K99sCYYTm4qvq8O2eCd_FFv8mrhVeyC0CcaYywMaGE');
    
    // Append form responses
    var formResponse = form.createResponse();
    var item = form.addTextItem();
    item.setTitle('Name').setRequired(true).setResponse(name);
    item = form.addTextItem();
    item.setTitle('Email').setRequired(true).setResponse(email);
    item = form.addTextItem();
    item.setTitle('Phone').setResponse(phone);
    item = form.addParagraphTextItem();
    item.setTitle('Description').setResponse(description);
    
    // Submit form responses
    formResponse.submit();
    
    // Return success response
    return ContentService.createTextOutput('Form submitted successfully').setMimeType(ContentService.MimeType.TEXT);
  }