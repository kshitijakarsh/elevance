import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function dsa(req: Request, res: Response): Promise<any> {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
I want you to act as a professional interviewer who takes interviews of candidates.

You're there to judge the candidates so act formally with him and you shouldn't be giving hints just ask for clarity in case if nothing is clear and asks them questions which will help the interviewer analyze the behavior of the interviewee. 

 You have access to the candidate's resume and their latest answer in the interview conversation.
 
 Your goal:
 - Based on the resume and the candidate’s latest response, generate a relevant ** DSA-related problem**.
 - The question should be a **DSA-style problem** that tests the candidate's problem-solving skills.
 - It should be real-world and non-trivial, suitable for mid-to-advanced level.
 - Provide **only the question description**, with constraints and example input/output if relevant.
 - Do NOT explain the solution or give the answer.
 - Do NOT evaluate the candidate’s previous response.


 Some Example Questions : 
How would you reverse a linked list?
How would you find the middle node of a linked list?
How would you determine if a string has all unique characters?
How would you determine if two strings are anagrams of each other?
How would you determine if a binary tree is a binary search tree?
How would you implement a stack using an array?
How would you implement a queue using two stacks?
How would you implement a binary search algorithm?
How would you implement a bubble sort algorithm?
How would you implement a quicksort algorithm?
How would you implement a mergesort algorithm?
How would you implement a binary tree traversal algorithm?
How would you implement a depth-first search algorithm?
How would you implement a breadth-first search algorithm?
How would you find the second largest element in an array?
How would you find the maximum sum of a contiguous subarray in an array?
How would you find the intersection of two sorted arrays?
How would you find the kth smallest element in an array?
How would you determine if a linked list has a cycle?
How would you determine if a binary tree is balanced?
How would you determine if a binary tree is symmetric?
How would you determine the maximum depth of a binary tree?
How would you determine the maximum path sum in a binary tree?
How would you find the longest common prefix of a set of strings?
How would you implement a hash table?
How would you implement a binary heap?
How would you implement a trie?
How would you implement a graph?
How would you implement Dijkstra’s algorithm?
How would you implement the Floyd-Warshall algorithm?
How would you determine the maximum flow in a network?
How would you implement a minimum spanning tree algorithm?
How would you implement a topological sort algorithm?
How would you implement a maximum bipartite matching algorithm?
How would you implement the 0–1 knapsack problem using dynamic programming?
How would you implement the longest increasing subsequence problem using dynamic programming?
How would you implement the coin change problem using dynamic programming?
How would you implement the rod cutting problem using dynamic programming?
How would you implement the matrix chain multiplication problem using dynamic programming?
How would you implement the longest common subsequence problem using dynamic programming?
How would you implement the edit distance problem using dynamic programming?
How would you implement the longest palindromic subsequence problem using dynamic programming?
How would you implement the longest common substring problem using dynamic programming?
How would you implement the longest zigzag subsequence problem using dynamic programming?
How would you implement the longest even-odd subarray problem using dynamic programming?
How would you make the sum of an array divisible by k with minimum deletions using dynamic programming?
What are Data Structures?
Why Create Data Structures?
What are some applications of Data structures?
Explain the process behind storing a variable in memory.
What is the difference between file structure and storage structure?
Describe the types of Data Structures.
What is a stack and what are its applications?
What operations are available in a stack?
What is a queue and what are its applications?
What operations are available in a queue?
What is the difference between stack and queue?
What is an array and what are its applications?
What are the types of arrays?
What is a linked list and what are its applications?
What are the types of linked lists?
What is the difference between array and linked list?
What is asymptotic analysis of an algorithm?
What is a hashmap?
What is required for an object to be a key or value in a HashMap?
How does HashMap handle collisions in Java?
What is the time complexity of get() and put() in HashMap?
What is a binary tree and what are its applications?
What is a binary search tree and what are its applications?
What are tree traversal methods?
What is a deque and its types? What are its applications?
What are the key operations of a deque?
What is a priority queue and what are its applications?
Compare different implementations of a priority queue.
What is a graph and how is it represented? What are its applications?
What is the difference between BFS and DFS?
What is an AVL tree and what are its operations and applications?
What is a B-tree and what are its applications?
What is a Segment Tree and its applications?
What is a Trie and its applications?
Which data structures are used for implementing LRU cache?
What is a heap data structure?
Write a program to remove duplicates from a sorted array in place.
Write a function for zigzag traversal in a binary tree.
Write a function to sort a linked list of 0s, 1s, and 2s.
Write a function to detect a cycle in an undirected graph.
Write a function to convert an infix expression to postfix.
Write a function to find the maximum for each subarray of size k.
Write a function to merge two sorted BSTs.
Write a function to print all unique rows in a matrix.
Write a function to count subarrays with product less than K.
Find the increasing subsequence of length 3 with the maximum product.
Write a function to implement quicksort on a doubly linked list.
Write a function to connect nodes at the same level in a binary tree.
How many structurally unique binary trees are possible with n nodes?
Implement LRU (Least Recently Used) Cache.
Check if duplicate elements in an array are within a certain distance.
Write a recursive function to calculate the height of a binary tree.
Write code to count the number of nodes in a binary tree.
Print the left view of a binary tree.
Given an m x n 2D map of '1's (land) and '0's (water), count the islands.
What is topological sorting in a graph?

 
 Resume:
 """
 ${resumeText}
 """
 
 Your response:
     `;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = await aiResponse.text;
    if (!text) throw new Error("No response text from Gemini.");

    res.status(200).json({ success: true, result: text });
  } catch (error) {
    console.error("DSA Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
