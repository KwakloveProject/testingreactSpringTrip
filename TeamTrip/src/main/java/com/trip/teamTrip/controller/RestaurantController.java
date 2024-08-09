package com.trip.teamTrip.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.trip.teamTrip.service.RestaurantService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService service;
    
    
    @GetMapping("/list")
    public List<Map<String, Object>> list() throws Exception {
        return service.list();
    }
    
	@PostMapping("/insert")
    public ResponseEntity<Map<String, String>> insert(
        @RequestParam Map<String, Object> map,
        @RequestParam(name = "titleImg", required = false) MultipartFile titleimg,
        @RequestParam(name = "sub1Img", required = false) MultipartFile sub1img,
        @RequestParam(name = "sub2TitleImg", required = false) MultipartFile sub2img,
        @RequestParam(name = "sub3TitleImg", required = false) MultipartFile sub3img,
        @RequestParam(name = "mapImg", required = false) MultipartFile mapImg,
        HttpServletRequest request) throws Exception {

        String fileTitleimg = "";
        String fileSub1img = "";
        String fileSub2img = "";
        String fileSub3img = "";
        String filemapImg = "";

        // 이미지 처리
        if (titleimg != null && !titleimg.isEmpty()) {
            fileTitleimg = titleimg.getOriginalFilename();
            try {
                ServletContext application = request.getSession().getServletContext();
                String path = application.getRealPath("/static/images/");
                titleimg.transferTo(new File(path + fileTitleimg));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (sub1img != null && !sub1img.isEmpty()) {
            fileSub1img = sub1img.getOriginalFilename();
            try {
                ServletContext application = request.getSession().getServletContext();
                String path = application.getRealPath("/static/images/");
                sub1img.transferTo(new File(path + fileSub1img));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (sub2img != null && !sub2img.isEmpty()) {
            fileSub2img = sub2img.getOriginalFilename();
            try {
                ServletContext application = request.getSession().getServletContext();
                String path = application.getRealPath("/static/images/");
                sub2img.transferTo(new File(path + fileSub2img));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        if (sub3img != null && !sub3img.isEmpty()) {
            fileSub3img = sub3img.getOriginalFilename();
            try {
                ServletContext application = request.getSession().getServletContext();
                String path = application.getRealPath("/static/images/");
                sub3img.transferTo(new File(path + fileSub3img));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (mapImg != null && !mapImg.isEmpty()) {
        	filemapImg = mapImg.getOriginalFilename();
            try {
                ServletContext application = request.getSession().getServletContext();
                String path = application.getRealPath("/static/images/");
                titleimg.transferTo(new File(path + filemapImg));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        // 파일명을 map에 추가
        map.put("titleImg", fileTitleimg);//xml 이랑 이름 맞혀줘야함 RequestParam name이랑도 맞아야함
        map.put("sub1Img", fileSub1img);
        map.put("sub2TitleImg", fileSub2img);
        map.put("sub3TitleImg", fileSub3img);
        map.put("mapImg", filemapImg);

        // 서비스 호출
        service.insert(map);

        // 성공적인 응답 반환
        Map<String, String> response = new HashMap<>();
        response.put("message", "Insert successful");
        return ResponseEntity.ok(response);
    }
	
	   @GetMapping("/detail/{no}")
	    public Map<String, Object> detail(@PathVariable(name = "no") Integer no) throws Exception {
	        return service.detail(no);
	    }
	   
	   @PostMapping("/update/{no}")
	   public void update(
	           @PathVariable(name = "no") Integer no,
	           @RequestParam Map<String, Object> map,
	           @RequestParam(name = "titleImg", required = false) MultipartFile titleImg,
	           @RequestParam(name = "sub1Img", required = false) MultipartFile sub1Img,
	           @RequestParam(name = "sub2TitleImg", required = false) MultipartFile sub2TitleImg,
	           @RequestParam(name = "sub3TitleImg", required = false) MultipartFile sub3TitleImg,
	           @RequestParam(name = "mapImg", required = false) MultipartFile mapImg,
	           HttpServletRequest request) throws Exception {

	       ServletContext application = request.getSession().getServletContext();
	       String path = application.getRealPath("/static/images/");
	       Map<String, MultipartFile> imageMap = new HashMap<>();
	       imageMap.put("titleImg", titleImg);
	       imageMap.put("sub1Img", sub1Img);
	       imageMap.put("sub2TitleImg", sub2TitleImg);
	       imageMap.put("sub3TitleImg", sub3TitleImg);
	       imageMap.put("mapImg", mapImg);

	       // 데이터베이스에서 기존 데이터 가져오기
	       Map<String, Object> existingData = service.detail(no);

	       // 이미지 파일 처리
	       for (Map.Entry<String, MultipartFile> entry : imageMap.entrySet()) {
	           MultipartFile img = entry.getValue();
	           String key = entry.getKey();
	           if (img != null && !img.isEmpty()) {
	               String filename = img.getOriginalFilename();
	               img.transferTo(new File(path + filename));
	               map.put(key, filename);
	               System.out.println(filename);
	           } else {
	               // 이미지가 업로드되지 않은 경우 기존 데이터에서 값을 가져옴
	               Object existingValue = existingData.get(key);
	               map.put(key, existingValue != null ? existingValue.toString() : "");
	           }
	       }

	       // `no`를 map에 추가
	       map.put("no", no);

	       // 데이터 업데이트
	       service.update(map);
	   }



	    

	   @RequestMapping("/delete/{no}") 
	   public void delete(@PathVariable(name = "no") String no, HttpServletRequest request) 
	           throws NumberFormatException, Exception { 

	       // 서비스에서 해당 restaurant_id로 파일명 가져오기
	       Map<String, String> filenames = service.filename(Integer.parseInt(no));

	       // 파일 경로 설정
	       ServletContext application = request.getSession().getServletContext(); 
	       String path = application.getRealPath("/static/images/");

	       // 각 파일명을 확인하고 삭제
	       for (String key : filenames.keySet()) {
	           String filename = filenames.get(key);
	           if (filename != null && !filename.equals("-")) { 
	               File file = new File(path + filename); 
	               if (file.exists()) { 
	                   file.delete(); 
	               } 
	           }
	       }
	       // 레코드 삭제
	       service.delete(Integer.parseInt(no));
	   } 

}
