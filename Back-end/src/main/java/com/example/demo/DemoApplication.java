package com.example.demo;

import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;

import com.example.demo.student.Student;
//import org.hibernate.cfg.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		try {
			// Replace the connection string with your MongoDB connection string
			MongoClient mongoClient = MongoClients.create("mongodb+srv://:@cluster0.ntrme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

			// Replace "sampleDB" with your actual database name
			MongoDatabase database = mongoClient.getDatabase("SampleDB");

			// Replace "sampleCollection" with your actual collection name
			MongoCollection<Document> collection = database.getCollection("SampleCollention");

			// Create a sample document
			Document sampleDoc = new Document("_id", "2").append("name", "John Smith");

			/// Insert the document into the collection
			collection.insertOne(sampleDoc);

			System.out.println("Document inserted successfully");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
