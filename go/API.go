package main


import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error
var user string

type User struct {
   ID uint `json:"id"`
   Username string `json:"username"`
   Password string `json:"password"`
   Name string `json:"name"`
   Isadmin int `json:"isadmin"`
}

type Response struct{
  Message string `json:"message"`
  ID int `json:"is"`
  Username string `json:"username"`
  Name string `json:"name"`
}

type Message struct{
  Message string `json:"message"`
  ID int `json:"is"`
}

type LoginData struct{
  Username string `json:"username"`
  Password string `json:"password"`
}

type Genre struct{
  ID int `json:"id"`
  Genre string `json:"genre"`
  Title string `json:"title"`
}

type Subt struct{
  ID int `json:"id"`
  Genre string `json:"genre"`
  Title string `json:"title"`

}

type Question struct{
  ID int `json:"id"`
  Quest string `json:"ques"`
  Genre string `json:"genre"`
  Title string `json:"title"`
  Opt1 string `json:"opt1"`
  Opt2 string `json:"opt2"`
  Opt3 string `json:"opt3"`
  Opt4 string `json:"opt4"`
  IsSingle int `json:"issingle"`
  Ans1 int `json:"ans1"`
  Ans2 int `json:"ans2"`
  Ans3 int `json:"ans3"`
  Ans4 int `json:"ans4"`

}

type Info struct{
  Genre string `json:"title"`
  Title string `json:"category"`

}

type Ans struct{
  Ans1 int `json:ans1`
  Ans2 int `json:ans2`
  Ans3 int `json:ans3`
  Ans4 int `json:ans4`

}

type Board struct{
  ID int `json:"id"`
  Username string `json:"username"`
  Genre string `json:"genre"`
  Title string `json:"title"`
  Score int `json:"score"`

}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.AutoMigrate(&Board{})
   db.AutoMigrate(&Subt{})
   db.AutoMigrate(&User{})
   db.AutoMigrate(&Question{})
   db.AutoMigrate(&Genre{})

   r := gin.Default()
   r.GET("/subt/:cat", Getsubt)
   r.POST("/create_ques/", CreateQues)
   r.POST("/add_sub/", add_sub)
   r.POST("/signup/", CreateUser)
   r.POST("/user/", isLogin)
   r.POST("/creategenre/", CreateGenre)
   r.GET("/genres/", GetGenre)
   r.POST("/subtques/",GetSubtQues)
   r.POST("/adminlog/",AdminLogin)
   r.DELETE("/admindel/:id",DeletePerson)
   r.DELETE("/del_ques/:id",DeleteQues)
   r.GET("/people/", GetPeople)
   r.DELETE("/del_genre/:id",DeleteGenre)
   r.DELETE("/del_subt/:id",Deletesubt)
   r.GET("/getans/:id", getAns)
   r.POST("/store/", Score)
   r.GET("/scores/:id", GetScores)
   r.GET("/viewme/:id", Viewme)



   r.Use((cors.Default()))
   r.Run(":8080")
}

func Viewme(c *gin.Context){
  name := c.Params.ByName("id")
  var score []Board
  err := db.Table("boards").Order("score desc").Find(&score).Error;
  if err!= nil{
    c.AbortWithStatus(404)
    fmt.Println(err)
  } else{
    if err:= db.Table("boards").Where("Username = ?", name).Order("score desc").Find(&score).Error; err!=nil{
      c.AbortWithStatus(404)
      fmt.Println(err)
    } else{
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200,score)
    }
  }
}

func GetScores(c *gin.Context){
  name := c.Params.ByName("id")
  var score []Board
  err := db.Table("boards").Order("score desc").Find(&score).Error;
  if err!= nil{
    c.AbortWithStatus(404)
    fmt.Println(err)
  } else{
    if err:= db.Table("boards").Where("Genre = ?",name).Order("score desc").Find(&score).Error; err!=nil{
      c.AbortWithStatus(404)
      fmt.Println(err)
    } else{
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200,score)
    }
  }
}


func Score(c *gin.Context){
  var board Board
  var userr Board
  var msg Message
  c.BindJSON(&board)
  if db.Table("boards").Where("username = ?" ,board.Username).Where("Title = ?" , board.Title).First(&userr).RecordNotFound()==true{
    db.Table("boards").Create(&board)
    msg.Message = "User created"
    msg.ID = 1
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200,msg)
  } else {
    msg.Message = "User already exists"
    msg.ID = 0
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(400,msg)
  }
}

func getAns(c *gin.Context){
  id := c.Params.ByName("id")
  var ques Question
  var msg Ans
  db.Table("questions").Where("ID = ?" ,id).First(&ques)
  msg.Ans1 = ques.Ans1
  msg.Ans2 = ques.Ans2
  msg.Ans3 = ques.Ans3
  msg.Ans4 = ques.Ans4
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, msg)
}

func DeleteQues(c *gin.Context) {
   id := c.Params.ByName("id")
   var ques Question
   var msg Message
   db.Table("questions").Where("ID = ?" ,id).First(&ques)
   d := db.Table("questions").Where("ID = ?", id).Delete(&ques)
   fmt.Println(d)
   msg.ID = 1
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, msg)
}

func Getsubt(c *gin.Context){
  name := c.Params.ByName("cat")
  var sub []Subt
  err := db.Table("subts").Where("Genre = ?", name).Find(&sub).Error;
  if err!= nil{
    c.AbortWithStatus(404)
    fmt.Println(err)
  } else{
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200,sub)
  }
}

func CreateQues(c *gin.Context){
  var quest Question
  var msg Message
  c.BindJSON(&quest)
  if(quest.Quest != ""){
  db.Table("questions").Create(&quest)
  msg.Message = "User created"
  msg.ID = 1
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200,msg)} else{
    msg.Message = "Error occured"
    msg.ID = 0
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200,msg)
  }
}

func DeleteGenre(c *gin.Context){
  id := c.Params.ByName("id")
  var gen Genre
  var geni []Question
  var msg Message
  db.Table("genres").Where("ID = ?",id).First(&gen)
  db.Table("questions").Where("Genre = ?",gen.Genre).Find(&geni)
  db.Table("genres").Where("ID = ?",id).Delete(&gen)
  d := db.Table("questions").Where("genre = ?", gen.Genre).Delete(&geni)
  fmt.Println(d);
  msg.Message = "Delete:YES"
  msg.ID = 1
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, msg)

}

func Deletesubt(c *gin.Context){
  id := c.Params.ByName("id")
  var gen Subt
  var geni []Question
  var msg Message
  db.Table("subts").Where("ID = ?",id).First(&gen)
  db.Table("questions").Where("Title = ?",gen.Title).Find(&geni)
  db.Table("subts").Where("ID = ?",id).Delete(&gen)
  d := db.Table("questions").Where("title = ?", gen.Title).Delete(&geni)
  fmt.Println(d);
  msg.Message = "Delete:YES"
  msg.ID = 1
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, msg)

}

func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person User
   var msg Message
   db.Table("users").Where("ID = ?" ,id).First(&person)
   msg.Message = person.Username

   d := db.Table("users").Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   msg.ID = 1
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, msg)
}

func GetPeople(c *gin.Context) {
   var people []User
   err := db.Find(&people).Error;
   if err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}

func GetSubtQues(c *gin.Context){
  var some Info
  c.BindJSON(&some)
  var data []Question
  err := db.Table("questions").Where("Genre = ?",some.Genre).Where("Title = ?",some.Title).Find(&data).Error;
  if err!= nil{
    c.AbortWithStatus(404)
    fmt.Println(err)
  } else{
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, data)
  }
}

func GetGenre(c *gin.Context){
  var genre []Genre
  err := db.Table("genres").Find(&genre).Error;
  if err!= nil{
    c.AbortWithStatus(404)
    fmt.Println(err)
  } else{
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, genre)
  }
}

func CreateUser(c *gin.Context) {
  var newuser User
  var userr User
  var msg Message
  c.BindJSON(&newuser)
  user := newuser.Username
  if db.Table("users").Where("username = ?" ,user).First(&userr).RecordNotFound()==true{
    db.Table("users").Create(&newuser)
    msg.Message = "User created"
    msg.ID = 1
  } else {
    msg.Message = "User already exists"
    msg.ID = 0
  }
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200,msg)
}

func CreateGenre(c *gin.Context){
  var genre Genre
  var temp Genre
  c.BindJSON(&genre)
  if db.Table("genres").Where("genre = ?" ,genre.Genre).First(&temp).RecordNotFound()==true{
    db.Create(&genre)
  }
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, temp)
}



func isLogin(c *gin.Context){
  var form LoginData
  var newuser User
  var userr User
  var resp Response
  c.BindJSON(&form)
  pass := form.Password
  user := form.Username

  if db.Table("users").Where("username = ?" ,user).First(&userr).RecordNotFound()==false{
    db.Table("users").Where("username = ?" ,user).First(&newuser)
      if(newuser.Password == pass){
          resp.Message = "successfully login"
          resp.ID = 1
          resp.Username = newuser.Username
          resp.Name = newuser.Name
          c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
          c.JSON(200,resp)
  }   else{
          resp.Message = "Password Incorrect"
          resp.ID = 0
          resp.Username = ""
          resp.Name = ""
          c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
          c.JSON(401,resp)
        }
} else {
  resp.Message = "User not Found"
  resp.ID = 0
  resp.Username = ""
  resp.Name = ""
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(404,resp)
}
}

func AdminLogin(c *gin.Context){
  var form LoginData
  var newuser User
  var userr User
  var resp Response
  c.BindJSON(&form)
  pass := form.Password
  user := form.Username

  if db.Table("users").Where("username = ?" ,user).First(&userr).RecordNotFound()==false{
    db.Table("users").Where("username = ?" ,user).First(&newuser)
      if(newuser.Password == pass && newuser.Isadmin == 1){
          resp.Message = "successfully login"
          resp.ID = 1
          resp.Username = newuser.Username
          resp.Name = newuser.Name
          c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
          c.JSON(200,resp)
  }
  }   else{
          resp.Message = "Password Incorrect"
          resp.ID = 0
          resp.Username = ""
          resp.Name = ""
          c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
          c.JSON(401,resp)
        }
  }

  func add_sub(c *gin.Context){
    var genre Subt
    var genrre Subt
    var msg Message

    c.BindJSON(&genre)
    if db.Table("subts").Where("Title = ?" ,genre.Title).First(&genrre).RecordNotFound()==true{
    db.Table("subts").Create(&genre)
    msg.Message = "Success"
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200,msg)
  } else {
    msg.Message = "Title exists"
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(400,msg)
  }

  }
