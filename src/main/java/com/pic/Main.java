package com.pic;

import java.io.Closeable;
import java.io.IOException;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Main {

	@org.junit.Test
	public void Test(){
		try {
			String result = getPics("http://yao.xywy.com/goods/8202.htm");
			//System.out.println(result);
			
			Document document = Jsoup.parse(result);
			Elements elementsName = document.getElementsByClass("f20 fYaHei fn mt20");
			for (Element element : elementsName) {
				System.out.println(element);
			}
			
			Elements elements = document.select("#spec-list ul li img");
			for (Element element : elements) {
				System.out.println(element.attr("big"));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public String getPics(String url) {
		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
		String result = "";
		try {
			
			httpClient = HttpClientBuilder.create().build();
			HttpGet httpGet = new HttpGet(url);
			response = httpClient.execute(httpGet);
			result = EntityUtils.toString(response.getEntity());
		} catch (Exception e) {
		} finally {
			try {
				httpClient.close();
				response.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	@org.junit.Test
	public void te(){
		int j = 0;

		for(int i =0; i < 1000; i++){
			
			int random = (int)(Math.random()*235);
			int random1 = (int)(1+Math.random()*(325 - 1 + 1));
			if(random1 >= 325 || random1 < 0){
				j++;
			}
			System.out.println(random1);
		}
		System.out.println(j);
        
	}
}
