package com.pic;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.print.attribute.standard.Media;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import com.alibaba.fastjson.JSON;
import com.pic.mode.ImageUrl;
import com.pic.mode.Medicine;

public class Paichong {

	private static ApplicationContext mApplicationContext;
	private static JdbcTemplate mJdbcTemplate;

	// 具名参数
	static NamedParameterJdbcTemplate mNamedParameterJdbcTemplate;

	public static void main(String[] args) {
		mApplicationContext = new ClassPathXmlApplicationContext("Application-config.xml");
		mJdbcTemplate = (JdbcTemplate) mApplicationContext.getBean("JdbcTemplate");
		mNamedParameterJdbcTemplate = (NamedParameterJdbcTemplate) mApplicationContext.getBean("nameJdbcTemplate");
		try {

			for (int i = 1; i <= 100000; i++) {
				Thread.sleep(50);
				String url = "http://yao.xywy.com/goods/" + i + ".htm";
				try {
					xywy(url);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			/*
			 * int totale=1; long goodsTotal = 10; for(int i=1;i<=totale;i++){
			 * final long itemp = i; long part = goodsTotal/totale; long count =
			 * part*itemp; new Thread(()->{ for(long k=count;k<count+part;k++){
			 * String url = "http://yao.xywy.com/goods/"+itemp+".htm"; // String
			 * url = "http://www.jianke.com/product/"+i+".html"; try {
			 * xywy(url); } catch (Exception e) { // TODO Auto-generated catch
			 * block e.printStackTrace(); } } }).start(); }
			 */

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取指定HTML 文档指定的body
	 * 
	 * @throws IOException
	 */
	private static Medicine xywy(String url) throws IOException {
		// 从 URL 直接加载 HTML 文档
		Medicine medicine = new Medicine();
		medicine.setUrl(url);
		Document doc2 = Jsoup.connect(url).get();
		Element body = doc2.body();
		//System.out.println(body);
		Elements elementsByClass = body.getElementsByClass("f20 fYaHei fn mt20");
		for (Element element : elementsByClass) {
			// System.out.println("=========== "+element);
			medicine.setName(element.html());
		}
		// 添加数据库
		if(medicine.getName() != null)
			insertMedine(medicine);
		System.out.println(JSON.toJSON(medicine));
		Elements images = body.getElementsByAttribute("big");
		if (images != null && medicine.getName() != null) {
			for (Element image : images) {
				ImageUrl imageUrl = new ImageUrl();
				imageUrl.setImageUrl(image.attr("big"));
				imageUrl.setMedcineId(medicine.getId());
				insertImageUrl(imageUrl);
			}
		}

		return medicine;
	}

	public static void insertMedine(Medicine par) {
		String sql = "INSERT INTO Medicine(name,url) VALUES('" + par.getName() + "','" + par.getUrl() + "');";
		// mJdbcTemplate.execute(sql1);

		KeyHolder keyHolder = new GeneratedKeyHolder();
		long autoIncId = 0;

		mJdbcTemplate.update(new PreparedStatementCreator() {
			public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
				PreparedStatement ps = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
				return ps;
			}
		}, keyHolder);

		autoIncId = keyHolder.getKey().longValue();
		par.setId(autoIncId);
	}

	public static void insertImageUrl(ImageUrl par) {
		String sql1 = "INSERT INTO ImageUrl(imageUrl,medcineId) VALUES('" + par.getImageUrl() + "','"
				+ par.getMedcineId() + "');";

		mJdbcTemplate.execute(sql1);
	}
}
