package com.trip.teamTrip.service;

import java.util.List;
import java.util.Map;

public interface TripReviewService {
	public List<Map<String, Object>> list() throws Exception; 
	 
	 public Map<String, Object> detail(int no) throws Exception; 
	  
	 public void insert(Map<String, Object> map) throws Exception; 
	  
	 public Map<String, String> filename(int no) throws Exception; 
	 
	 public void update(Map<String, Object> map) throws Exception; 
	 
	 public void delete(int no) throws Exception; 


}
