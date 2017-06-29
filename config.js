export default {
    //license: 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiXSwidmFsaWQiOiIyMDE4LTAzLTE2IiwibWFqb3JWZXJzaW9uIjoiMyIsImlzQ29tbWVyY2lhbCI6ZmFsc2UsInRvbGVyYW5jZURheXMiOjYwLCJpb3NJZGVudGlmaWVyIjpbImNvbS5mcmltdXN0ZWNobm9sb2dpZXMuQmFyQ29kZVNjYW5uZXIiXSwiYW5kcm9pZElkZW50aWZpZXIiOlsiY29tLmZyaW11c3RlY2hub2xvZ2llcy5CYXJDb2RlU2Nhbm5lciJdLCJ3aW5kb3dzSWRlbnRpZmllciI6WyJjb20uZnJpbXVzdGVjaG5vbG9naWVzLkJhckNvZGVTY2FubmVyIl19ClpXVDdjSFZiaGxtYlJTM3pXWVdsckJrcUJraUExTlduZEFJa2NteW9yZWxUNU1od3pVZFhFc0kwNEhRcGxpaHNaR2ZnLzlsOHgzVDdSVlFEeDk0MHZMMGJVNkFseXN6cHRoOGVSNmdBMGxyMi9Na2cxNTIxNElxN2FIWWcrTURlZXZxbXpHOFM3YUFwQ1hPenFNZm04REhFUXFSQ3JyQXFCSWxiTHd2cEZJNFpJSGFYbGMzeTZhRWdtQ29CWTJOZU50RUNDUFZ6czNEY1Vta1JEeEkvQ1FBOTNwL2JtbnllU2dMd2pGdlN3Q2MyRWRUcWlZMTRQdnBpZk9RUEJvUHN6MEZwUmVVaXhvdEJWK2VUS2o0ZXdQVWJjM3JBSjdWOVpIL0VPZkNRWlRZYXVoa3JvZXNFZU5EZUpFNWxBaEFYY0lvVGI5WlUrYm1CaThiNVFNQjdhQT09',
    license: 'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiXSwidmFsaWQiOiIyMDE4LTAzLTE3IiwibWFqb3JWZXJzaW9uIjoiMyIsImlzQ29tbWVyY2lhbCI6ZmFsc2UsInRvbGVyYW5jZURheXMiOjYwLCJpb3NJZGVudGlmaWVyIjpbImNvbS5tYXN0ZXJ5bWVkaWEuZmJhc2Nhbm5lciJdLCJhbmRyb2lkSWRlbnRpZmllciI6WyJjb20ubWFzdGVyeW1lZGlhLmZiYXNjYW5uZXIiXSwid2luZG93c0lkZW50aWZpZXIiOlsiY29tLm1hc3RlcnltZWRpYS5mYmFzY2FubmVyIl19CnFnZjNNczZCalRndjlQQWFKY2FVTVJ2azBEUng3bkwwU0RGQjlidVlMQUJXYldpMFVGTUk2WlNNSytZdTRCK2tMdVJtRUJFWnZNd1V5VS90NUJFaGlZb3kxMlNFR292M0tlRkl6Y0Z3WGpZeldqRktBU3cvSnJkcGdtcVQrOCtBWGlPS25NdUNXUXFoNmkxUmIyMGtJdyswNi9wZG1KRmtaVno2UFpBc1paZWdwQkk1dTBveVpJSk5YVXpTOUxVaGFvUVcvajBsZGZ4aHR5YVpVS1NoQU5BYU5CQlhkNlJ3SE9WVjlzT0Z3QlZTcktsSVdQMTQ2bWFUQmx3TWc3bURBaUU1Skx5STRhU3B6ZlBScFRVbjl3eXZMa09uQkFpQUlBc3JaK3AwYzByeXliYWF4amRxaU90SmM0Z201RkRRVVVza09JVWpXRnZUUldyRy9sVlcwUT09',
    options: {
        "captureResolution":"1080p",
        "cutout": {
            "style": "rect",
            "maxWidthPercent": "80%",
            "maxHeightPercent": "80%",
            "alignment": "center",
            "width": 540,
            "ratioFromSize": {
                "width": 5,
                "height": 1
            },
            "strokeWidth": 2,
            "cornerRadius": 10,
            "strokeColor": "FFFFFF",
            "outerColor": "000000",
            "outerAlpha": 0.3
        },
        "flash": {
            "mode": "manual",
            "alignment": "bottom_right"
        },
        "beepOnResult": true,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true,
        "cancelOnResult": false,
        "visualFeedback": {
            "style": "contour_underline",
            "strokeWidth": 3,
            "strokeColor": "0099FF"
        }
    },
    ocr: {
        "scanMode": "LINE",
        "minCharHeight": 20,
        "maxCharHeight": 70,
        "tesseractLanguages" :"eng_no_dict",
        "traineddataFiles": ["eng_no_dict.traineddata"],
        "charWhitelist": "ISBN0123456789<>-X",
        "validationRegex": "^(ISBN)?((-)?\\s*(13|10))?:?\\s*((978|979){1}-?\\s*)*[0-9]{1,5}-?\\s*[0-9]{2,7}-?\\s*[0-9]{2," +
        "7}-?\\s*[0-9X]$",
        "minConfidence": 65,
        "removeSmallContours": true,
        "removeWhitespaces":true,
        "minSharpness":62

    }

}
