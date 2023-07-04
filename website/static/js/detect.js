$(document).ready(function () {
    // Prevent default drag and drop behavior
    $("#loading").hide();
    $(document).on({
      dragover: function() {
          return false;
      },
      drop: function() {
          return false;
      }
    });
    $('#corn_image').change(function(){
        const file = this.files[0];
        console.log(file);
        if (file){
          let reader = new FileReader();
          reader.onload = function(event){
            console.log(event.target.result);
            $('#image').attr('src', event.target.result);
            $('#image').attr('style','display:block');
            $('.detect-preview').attr('style','display:block');
            
          }
          reader.readAsDataURL(file);
        }
      });


      $( "#btn_analyze" ).click(function() {
        var reader = new FileReader();
        reader.readAsDataURL($('#corn_image').prop('files')[0]);

        reader.onload = function () {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
          if ((encoded.length % 4) > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4));
          }
          data = { 'image' : encoded,
                    'filename':$('#corn_image').prop('files')[0].name}
          $("#loading").show();
          $.ajax({
            type: "POST",
            url: '/detect_async',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              $("#loading").hide();
              console.log(data)
              $(".disease").attr('style','display:none')
              if(data.dieses == "Blight"){
                $(".disease-blight").attr('style','display:block')
              }
              if(data.dieses == "Gray_Leaf_Spot"){
                $(".disease-gray").attr('style','display:block')
              }
              if(data.dieses == "Common_Rust"){
                $(".disease-rust").attr('style','display:block')
              }
              if(data.dieses == "Healthy"){
                $(".disease-none").attr('style','display:block')
              }
              if(data.dieses == "Invalid"){
                $(".disease-invalid").attr('style','display:block')
              }
            }
            });

        };
        reader.onerror = function (error) {
          $("#loading").hide();
          console.log('Error: ', error);
        };
        

        
      });
      
      // Drag and Drop file
      const dropArea = $(".drag-image"),
      dragText = $("h6"),
      button = $("#browse-button"),
      input = $("input");
      let file; 

      button.onclick = ()=>{
      
      }

      button.click(function(){
        input.click(); 
      });



      input.change(function(e){
        console.log("File added");
        file = e.target.files[0]
        dropArea.addClass("active");
        viewfile(file);
      });

      // dropArea.addEventListener("dragover", (event)=>{
      //   event.preventDefault();
      //   dropArea.classList.add("active");
      //   dragText.textContent = "Release to Upload File";
      // });

      dropArea.on('dragover', function(){
        
        dropArea.addClass("active");
        dragText.textContent = "Release to Upload File";
        console.log("test");
      })
      dropArea.bind('drop', function(e) {
        e.preventDefault();
        e.stopPropagation()
        console.log("TEST2");
        file = e.originalEvent.dataTransfer.files;
        input.prop("files", file);
        viewfile(e.originalEvent.dataTransfer.files[0]); 
    });
      // dropArea.addEventListener("dragleave", ()=>{
      //   dropArea.classList.remove("active");
      //   dragText.textContent = "Drag & Drop to Upload File";
      // }); 


      dropArea.on('dragleave', function(){
        
        dropArea.removeClass("active");
        dragText.textContent = "Drag & Drop to Upload File";
      })

      dropArea.hover(
        function(){
          if(input.get(0).files.length > 0){
            $('.drag-image >div').attr('style','display:flex')
          }
        
        }, function(){
          if(input.get(0).files.length > 0){
            $('.drag-image >div').attr('style','display:none')
          }
          
      });

      dropArea.bind("touchstart", function(e) {

        if(input.get(0).files.length > 0){
          $('.drag-image >div').attr('style','display:flex')
        }
       
       });

      // dropArea.addEventListener("drop", (event)=>{
      //   event.preventDefault(); 
        
      //   file = event.dataTransfer.files[0];
      //   viewfile(); 
      // });

      // dropArea.on('dragenter', function(e ){
      //   e.preventDefault();
      //   e.stopPropagation()
      //   console.log("TEST2");
      //   file = e.originalEvent.dataTransfer.files
        
      //   viewfile(file); 
      // })

      function viewfile(file){
        let fileType = file.type; 
        let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if(validExtensions.includes(fileType)){ 
          let fileReader = new FileReader(); 
          fileReader.onload = (event)=>{
            $('.drag-prev-image').attr('src', event.target.result);
            $('.drag-prev-image').removeAttr('hidden')
            $('.drag-image >div').attr('style','display:none')
          }
          fileReader.readAsDataURL(file);
        }else{
          alert("This is not an Image File!");
          dropArea.classList.remove("active");
          dragText.textContent = "Drag & Drop to Upload File";
        }
      }

});




