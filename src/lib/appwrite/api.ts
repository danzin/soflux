import { ID, Query } from 'appwrite'
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';

export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) => {
  try{
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user,
    )
    return newUser;
  }catch(e){
    console.log(e)
  }

}

export const createAccount = async(user: INewUser) => {
  try{
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    if(!newUser) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUAcc = await saveUserToDB({
      accountId: newUser.$id,
      name: newUser.name,
      email: newUser.email,
      username: user.username,
      imageUrl: avatarUrl
    });

    return newUAcc;
  }catch(e){
    console.log(e);
    return e;
  }
}

export const signInAccount = async (user: {email: string; password: string}) => {
  try{
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  }catch(e){
    console.log(e);
  }
} 
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function signOutAccount(){
  try{
    const session = await account.deleteSession("current");

    return session;
    
  }catch(e){
    console.log(e)
  }
}

export const createPost = async (post: INewPost) => {
  try{
    //upload image
    const uploadedFile = await uploadFile(post.file[0])

    if(!uploadedFile) throw Error

    const fileUrl = getFilePreview(uploadedFile.$id)
    if(!fileUrl) {
      await deleteFile(uploadedFile.$id)
      throw Error
    };

    //convert tags in array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    //save post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if(!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  }catch(e){
    console.log(e)
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string){
  try {
    await storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    )
    return {status: 'ok'}
} catch (e) {
  console.log(e)
    
  }
}

export async function getRecentPosts(){
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postsCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)]
  )

  if(!posts) throw Error
  return posts
}

export async function likePost(postId: string, likesArray: string[]){
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray
      }
    )
    if(!updatedPost) throw Error;
    
    return updatedPost;
  } catch (e) {
    console.log(e)
  }
}

export async function savePost(postId: string, userId: string){
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )

    if(!updatedPost) throw Error;
    return updatedPost;
  } catch (e) {
    console.log(e)
  }
}

export async function deleteSavedPost(savedRecordId: string){
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )

    if(!statusCode) throw Error;
    return {status: 'ok'};
  } catch (e) {
    console.log(e);
  }
}

export async function getPostById(postId?: string) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}


export const updatePost = async (post: IUpdatePost) => {
  const hasFile = post.file.length > 0;
  try{
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    }

    if(hasFile){
      const uploadedFile = await uploadFile(post.file[0])
      if(!uploadedFile) throw Error

      const fileUrl = getFilePreview(uploadedFile.$id)

      if(!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      };

      image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
    }

    //convert tags in array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    //update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    if(!updatedPost) {
      await deleteFile(post.imageId);
      throw Error;
    }
    return updatedPost;
  }catch(e){
    console.log(e)
  }
}

export async function deletePost(postId: string, imageId: string){
  if(!postId || !imageId) throw Error;
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )
    return {status: 'ok'}
  } catch (e) {
    console.log(e)
  }

}

export async function getUserPosts(userId?: string) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

