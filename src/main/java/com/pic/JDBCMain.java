package com.pic;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;


public class JDBCMain {

	private ApplicationContext mApplicationContext;
	private JdbcTemplate mJdbcTemplate;
	
	//具名参数
	NamedParameterJdbcTemplate mNamedParameterJdbcTemplate;
	
	{
		mApplicationContext = new ClassPathXmlApplicationContext("Application-config.xml");
		mJdbcTemplate = (JdbcTemplate) mApplicationContext.getBean("JdbcTemplate");
		mNamedParameterJdbcTemplate = (NamedParameterJdbcTemplate) mApplicationContext.getBean("nameJdbcTemplate");
	}
	
	/**
	 * 1. 测试数据源是否连接上
	 * @throws SQLException 
	 */
	@Test
	public void testDataSource() throws SQLException{
		DataSource dataSource = (DataSource) mApplicationContext.getBean("dataSource");
		System.out.println(dataSource);
		System.out.println(dataSource.getConnection());
	}
	
	/**
	 * 2. add del update select
	 */
	@Test
	public void testSql(){
//		System.out.println(mNamedParameterJdbcTemplate);
		String sql = "INSERT INTO user(id,name,address,phoneNum,email) VALUES(4, \"no4\", 'shenzhen1', '14785236997', 'tt@t.com');";
		mJdbcTemplate.execute(sql);
	}
	
	
	/**
	 * 从数据库中获取一条记录
	 */
	@Test
	public void queryForObject(){
//		String sql = "SELECT * FROM user WHERE id = ?";
//		
//		RowMapper<User> rowMapper = new BeanPropertyRowMapper<>(User.class);
//		User user = mJdbcTemplate.queryForObject(sql, rowMapper, 1);
//		
//		System.out.println(user.toString());
	}

	
	/**
	 * 测试mNamedParameterJdbcTemplate
	 */
	@Test
	public void testNameTemplate(){
		String sql = "INSERT INTO user(id,name,address,phoneNum,email) VALUES(:ln, :ln2, :ln3, :ln4, :tet);";
		
		Map par = new HashMap<>();
		par.put("ln", 5);
		par.put("ln2", "no5");
		par.put("ln3", "12345679897");
		par.put("ln4", "22547");
		par.put("tet", "122@te.com");
		
		mNamedParameterJdbcTemplate.update(sql, par);
	}
	/**
	 * 测试mNamedParameterJdbcTemplate
	 */
	/*@Test
	public void testNameTemplate2(){
		String sql = "INSERT INTO user(id,name,address,phoneNum,email) VALUES(:id, :name, :address, :phoneNum, :email);";
		
		User par = new User();
		par.setId(6);
		par.setName("no6");
		par.setAddress("12345679897");
		par.setPhoneNum("22547");
		par.setEmail("122@te.com");
		
		SqlParameterSource source = new BeanPropertySqlParameterSource(par);
		
		mNamedParameterJdbcTemplate.update(sql, source);
	}*/
}
