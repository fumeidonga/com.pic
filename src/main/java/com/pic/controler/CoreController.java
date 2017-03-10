package com.pic.controler;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pic.mode.Medicine;

@Controller
public class CoreController {

	@Autowired
	private JdbcTemplate mJdbcTemplate;

	@ResponseBody
	@RequestMapping(value = "test.do", method = RequestMethod.GET)
	public String test(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String jsonp_callback = request.getParameter("jsonp_callback");
		System.out.println(jsonp_callback);
		String jsonStr = "{tet:\"hello world\"}";
		if (jsonp_callback != null) {
			jsonStr = jsonp_callback + "(" + jsonStr + ")";
		}
		System.out.println(mJdbcTemplate);
		return jsonStr;
	}

	@ResponseBody
	@RequestMapping(value = "test1.do", method = RequestMethod.GET)
	public String test1(@RequestParam(value = "name", required = false) String name) {
		System.out.println("test");
		return "jsonp_callback({test:\"hello world\"})";
	}

	@ResponseBody
	@RequestMapping(value = "queryName", method = RequestMethod.GET)
	public String queryName(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String name = request.getParameter("name");
		String sql = "SELECT imageUrl, tb2.id, tb2.name  from ImageUrl tb1 LEFT JOIN Medicine tb2 on tb1.medcineId=tb2.id WHERE tb2.name LIKE '%"
				+ URLDecoder.decode(name, "UTF-8") + "%'";
		System.out.println(sql);
		//Map<String, Object> map = mJdbcTemplate.queryForMap(sql);
		
		return "test";
	}
}
