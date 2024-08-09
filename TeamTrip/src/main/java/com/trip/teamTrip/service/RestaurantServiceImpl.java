package com.trip.teamTrip.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trip.teamTrip.mapper.RestaurantMapper;

@Service
public class RestaurantServiceImpl implements RestaurantService {

	 @Autowired 
	 private RestaurantMapper mapper; 
	  
	 @Override 
	 public List<Map<String, Object>> list() throws Exception { 
	  return mapper.list(); 

	} 
	 
	 @Override 
	 public Map<String, Object> detail(int no) throws Exception { 
		 System.out.println("!!!!!!!!!!!!!!!! " );
	  return mapper.detail(no); 
	 } 
	 
	 @Override 
	 public Map<String, String> filename(int no) throws Exception { 
	  return mapper.filename(no); 
	 } 
	 
	 @Override 
	 public void update(Map<String, Object> map) throws Exception { 
		 System.out.println("!!!!!!!!!!!!!!!! " + map);
	  mapper.update(map); 
		 System.out.println("zzzz");

	 } 
	 
	 @Override 
	 public void delete(int no) throws Exception { 
	  mapper.delete(no); 
	 
	 } 
	 
	 @Override 
	 public void insert(Map<String, Object> map) throws Exception { 
		   mapper.insert(map); 
	   
	 } 
}
